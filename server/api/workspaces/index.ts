import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

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
        deletedAt: null
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
            },
            creator: {
              select: {
                id: true,
                name: true,
                lastname: true,
                avatar: true
              }
            }
          }
        },
        members: {
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
        creator: {
          select: {
            id: true,
            name: true,
            lastname: true,
            avatar: true
          }
        }
      }
    })

    return workspaces
  } catch (error: any) {
    throw error
  }
})
