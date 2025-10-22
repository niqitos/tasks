import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const task = await getRouterParam(event, 'task')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const taskTryingToDelete = await prisma.task.findUnique({
      where: {
        id: task
      }
    })

    if (!taskTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    if (taskTryingToDelete.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update task',
      })
    }

    await prisma.task.delete({
      where: {
        id: task
      }
    })

    await prisma.activityLog.create({
      data: {
        logName: 'default',
        description: 'Task deleted',
        subjectId: taskTryingToDelete.id,
        subjectType: 'Task',
        event: 'deleted',
        causedById:  decodedToken.id,
        properties: {
          deletedAt: new Date()
        }
      }
    })
  } catch (err) {
    console.log(err)
  }
})
