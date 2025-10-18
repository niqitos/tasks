import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
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

    const decodedToken = await jwt.verify(token, config.jwtSecret)

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

    const now = new Date()

    prisma.taskHistory.create({
      data: {
        taskId: taskTryingToDelete.id,
        // fromBoardId: taskTryingToDelete.boardId,
        toBoardId: taskTryingToDelete.boardId,
        updatedById: decodedToken.id,
        updatedAt: now,
        note: 'deleted'
      }
    })
  } catch (err) {
    console.log(err)
  }
})
