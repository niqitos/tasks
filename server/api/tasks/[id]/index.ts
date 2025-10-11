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
        statusMessage: 'Not authorized to access tasks',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const tasks = await prisma.task.findFirst({
      where: {
        id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            lastname: true,
            avatar: true
          }
        },
        assignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                lastname: true,
                avatar: true
              }
            }
          }
        },
        comments: true,
        files: true
      }
    })

    return tasks
  } catch (err) {
    console.log(err)
  }
})
