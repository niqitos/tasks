import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const workspaceId = await getRouterParam(event, 'workspace') as string

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const existingWorkspaceMemberTrying = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId: body.user,
        deletedAt: {
          not: null,
        }
      }
    })

    let workspaceMember

    if (existingWorkspaceMemberTrying) {
      workspaceMember = await prisma.workspaceMember.update({
        where: {
          workspaceId_userId: {
            workspaceId,
            userId: body.user,
          },
          deletedAt: {
            not: null,
          }
        },
        data: {
          deletedAt: null
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              lastname: true,
              email: true,
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
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId
      },
      include: {
        creator: {
          select: {
            id: true,
            inboxes: {
              select: {
                id: true
              },
              where: {
                default: true
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
        }
      }
    })

    if (!workspace) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Workspace does not exist',
      })
    }

    // if (existingWorkspaceMemberTrying.creatorId !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to update board',
    //   })
    // }

    if (!workspaceMember) {
      workspaceMember = await prisma.workspaceMember.create({
        data: {
          workspaceId,
          userId: body.user,
          role: body.role,
          color: body.color,
          invitedById: decodedToken.id
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              lastname: true,
              email: true,
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
    }

    await prisma.inboxItem.create({
      data: {
        type: 'workspaceCreated',
        message: 'inbox.messages.workspace.member.created',
        relatedType: 'WorkspaceMember',
        relatedId: workspace.id,
        workspaceId: workspace.id,
        inboxId: workspaceMember.user.inboxes[0].id,
        creatorId: workspaceMember.invitedById
      }
    })

    const fcmToken = await prisma.fcmToken.findFirst({
      where: {
        userId: workspaceMember.user.id
      }
    })

    if (!fcmToken) {
      const result = await sendFCMNotification(
        fcmToken.token,
        {
          title: 'Test title',
          body: 'Test message'
        },
        {
          link: '/',
          userId: workspaceMember.user.id.toString(),
          timestamp: new Date().toISOString()
        }
      )
    }

    await sendPusherNotification(`inbox.${workspaceMember.user.id}`, 'workspace.member.added', workspaceMember)

    workspace.members.forEach(async (member: WorkspaceMember) : Promise<any> => {
      await sendPusherNotification(`inbox.${member.user.id}`, 'workspace.member.added', member)
    })

    return workspaceMember
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message,
    })
  }
})
