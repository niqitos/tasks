import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const id = await getRouterParam(event, 'id')
    const file = await getRouterParam(event, 'file')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    console.log(file)
    const taskFileTryingToDelete = await prisma.file.findUnique({
      where: {
        id: file
      }
    })

    if (!taskFileTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task file does not exist',
      })
    }

    // if (taskFileTryingToDelete.createdById !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to delete task file',
    //   })
    // }

    await prisma.file.delete({
      where: {
        id: file
      }
    })
  } catch (err) {
    console.log(err)
  }
})
