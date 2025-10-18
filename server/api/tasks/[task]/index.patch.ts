import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
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

    const taskTryingToUpdate = await prisma.task.findUnique({
      where: {
        id: task
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

    await prisma.task.update({
      where: {
        id: task
      },
      data: body
    })
  } catch (err) {
    console.log(err)
  }
})
