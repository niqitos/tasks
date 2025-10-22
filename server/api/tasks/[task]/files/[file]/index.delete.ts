import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const task = await getRouterParam(event, 'task')
    const fileId = await getRouterParam(event, 'file')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const taskFileTryingToDelete = await prisma.file.findUnique({
      where: {
        id: fileId
      }
    })

    if (!taskFileTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task file does not exist',
      })
    }

    if (taskFileTryingToDelete.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to delete task file',
      })
    }

    await prisma.file.delete({
      where: {
        id: fileId
      }
    })
  } catch (err) {
    console.log(err)
  }
})
