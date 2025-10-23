import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const workspaceId = await getRouterParam(event, 'workspace')
    const memberId = Number(await getRouterParam(event, 'member'))

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const workspaceMemberTryingToDelete = await prisma.workspaceMember.findUnique({
      where: {
        id: memberId
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

    if (!workspaceMemberTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Workspace member does not exist',
      })
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId
      },
      include: {
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

    // if (workspaceMemberTryingToDelete.assignedById !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to delete task assignee',
    //   })
    // }

    await prisma.workspaceMember.delete({
      where: {
        id: memberId
      }
    })

    await prisma.inboxItem.create({
      data: {
        type: 'workspaceCreated',
        message: 'inbox.messages.workspace.member.deleted',
        relatedType: 'WorkspaceMember',
        relatedId: workspaceMemberTryingToDelete.workspaceId,
        workspaceId: workspaceMemberTryingToDelete.workspaceId,
        inboxId: workspaceMemberTryingToDelete.user.inboxes[0].id,
        creatorId: workspaceMemberTryingToDelete.invitedById
      }
    })

    workspace.members
      .forEach(async (member: WorkspaceMember) : Promise<any> => {
        const event = await sendPusherNotification(`inbox.${member.user.id}`, 'workspace.member.removed', member)
      })

  } catch (err) {
    console.log(err)
  }
})
