import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const board = await getRouterParam(event, 'board')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const boardTryingToUpdate = await prisma.board.findUnique({
      where: {
        id: board
      }
    })

    if (!boardTryingToUpdate) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Board does not exist',
      })
    }

    if (boardTryingToUpdate.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update board'
      })
    }

    await prisma.board.update({
      where: {
        id: board
      },
      data: body
    })
  } catch (err) {
    console.log(err)
  }
})
