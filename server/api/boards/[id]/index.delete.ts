import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const id = await getRouterParam(event, 'id')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const boardTryingToDelete = await prisma.board.findUnique({
      where: {
        id
      }
    })

    if (!boardTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Board does not exist',
      })
    }

    if (boardTryingToDelete.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update board',
      })
    }

    await prisma.board.delete({
      where: {
        id
      }
    })
  } catch (err) {
    console.log(err)
  }
})
