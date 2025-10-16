import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const id = await getRouterParam(event, 'id')
    const user = await getRouterParam(event, 'user')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const newTaskAssignee = await prisma.taskAssignee.create({
      data: {
        taskId: id,
        userId: user
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            lastname: true,
            email: true,
            avatar: true,
          }
        }
      }
    })

    return newTaskAssignee
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not verify jwt',
    })
  }
})
