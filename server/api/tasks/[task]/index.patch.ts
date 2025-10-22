import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'
import { getUpdatedFields } from '@@/server/utils/diff'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const taskId = await getRouterParam(event, 'task') as string

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const taskTryingToUpdate = await prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if (!taskTryingToUpdate) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    if (taskTryingToUpdate.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update task'
      })
    }

    const task = await prisma.task.update({
      where: {
        id: taskId
      },
      data: body
    })

    const now = new Date()

    await prisma.activityLog.create({
      data: {
        logName: 'default',
        description: 'Task updated',
        subjectId: task.id,
        subjectType: 'Task',
        event: 'updated',
        causedById:  decodedToken.id,
        properties: getUpdatedFields(taskTryingToUpdate, task, ['updatedAt'])
      }
    })
  } catch (err) {
    console.log(err)
  }
})
