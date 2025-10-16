import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const workspaceId = await getRouterParam(event, 'workspace')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access users',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const users = await prisma.user.findMany({
      where: {
        workspaceMembers: {
          some: {
            workspaceId: workspaceId,
            deletedAt: null
          }
        },
        deletedAt: null
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        avatar: true,
        workspaceMembers: {
          select: {
            role: true,
            joinedAt: true
          }
        }
      }
    })

    return users
  } catch (err) {
    console.log(err)
  }
})
