import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    const q = query.q as string
    const excludeWorkspaceId = query.excludeWorkspaceId as string

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access users',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: q,
              mode: 'insensitive'
            }
          },
          {
            lastname: {
              contains: q,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: q,
              mode: 'insensitive'
            }
          }
        ],
        AND: [
          {
            workspaceMembers: {
              none: {
                workspaceId: excludeWorkspaceId,
                deletedAt: null
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        avatar: true
      },
      take: 10
    })

    return users
  } catch (err) {
    console.log(err)
  }
})
