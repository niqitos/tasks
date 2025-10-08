import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'
import { getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [
          {
            creatorId: decodedToken.id
          },
          {
            members: {
              some: {
                userId: decodedToken.id
              }
            }
          }
        ],
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        boards: {
          where: {
            deletedAt: null
          },
          orderBy: {
            position: 'asc'
          },
          include: {
            tasks: {
              where: {
                deletedAt: null
              },
              orderBy: {
                position: 'asc'
              },
              include: {
                creator: true,
                assignees: {
                  include: {
                    user: true
                  }
                },
                comments: true,
                files: true
              }
            },
            creator: true
          }
        },
        members: {
          include: {
            user: true
          }
        },
        creator: true
      }
    })

    return workspaces
  } catch (error: any) {
    throw error
  }
})
