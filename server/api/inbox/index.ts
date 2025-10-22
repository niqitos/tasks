import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access user',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const messages = await prisma.inboxItem.findMany({
      where: {
        inbox: {
          userId: decodedToken.id
        },
        // isRead: false
      },
      include: {
        task: true,
        comment: true,
        workspace: true,
        creator: {
          select: {
            id: true,
            name: true,
            lastname: true,
            avatar: true,
            plan: true,
            inboxes: {
              select: {
                id: true
              },
              where: {
                default: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return messages
  } catch (err) {
    console.log(err)
  }
})
