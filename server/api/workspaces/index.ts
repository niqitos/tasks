import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [
          {
            creatorId: decodedToken.id
          },
          {
            members: {
              some: {
                userId: decodedToken.id,
                deletedAt: null
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
                    avatar: true,
                    plan: true
                  }
                },
                assignees: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        lastname: true,
                        avatar: true,
                        plan: true
                      }
                    }
                  },
                  where: {
                    deletedAt: null
                  }
                },
                comments: true,
                files: {
                  where: {
                    deletedAt: null
                  }
                }
              }
            },
            creator: {
              select: {
                id: true,
                name: true,
                lastname: true,
                avatar: true,
                plan: true
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
                avatar: true,
                plan: true
              }
            }
          },
          where: {
            deletedAt: null
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            lastname: true,
            avatar: true,
            plan: true
          }
        }
      }
    })

    return workspaces
  } catch (error: any) {
    throw error
  }
})
