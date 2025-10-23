import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()
  const t = await useTranslation(event)

  try {
    const body = await readBody(event)

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const workspace = await prisma.workspace.create({
      data: {
        name: body.name,
        description: body.description,
        backgroundType: body.backgroundType,
        background: body.background,
        creatorId: decodedToken.id,
        members: {
          create: {
            userId: decodedToken.id,
            role: 'admin',
            invitedById: decodedToken.id
          }
        },
        boards: {
          create: [
            {
              position: 1,
              name: t('board.default.1.name'),
              description: t('board.default.1.description'),
              creatorId: decodedToken.id
            },
            {
              position: 2,
              name: t('board.default.2.name'),
              description: t('board.default.2.description'),
              creatorId: decodedToken.id
            },
            {
              position: 3,
              name: t('board.default.3.name'),
              description: t('board.default.3.description'),
              creatorId: decodedToken.id
            }
          ]
        }
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
          }
        },
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
      }
    })

    await prisma.inboxItem.create({
      data: {
        type: 'workspaceCreated',
        message: 'inbox.messages.workspace.created',
        relatedType: 'Workspace',
        relatedId: workspace.id,
        workspaceId: workspace.id,
        inboxId: workspace.creator.inboxes[0].id,
        creatorId: workspace.creator.id
      }
    })

    await sendPusherNotification(`inbox.${workspace.creator.id}`, 'workspace.created', workspace)

    return workspace
  } catch (err) {
    throw err
    // throw createError({
    //   statusCode: 500,
    //   statusMessage: 'Could not verify jwt',
    // })
  }
})
