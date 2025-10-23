import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const taskId = await getRouterParam(event, 'task')
    const assigneeId = Number(await getRouterParam(event, 'assignee'))

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const taskAssigneeTryingToDelete = await prisma.taskAssignee.findUnique({
      where: {
        id: assigneeId
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

    if (!taskAssigneeTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task assignee does not exist',
      })
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId
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
          }
        }
      }
    })

    if (!task) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    // if (taskAssigneeTryingToDelete.assignedById !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to delete task assignee',
    //   })
    // }

    await prisma.taskAssignee.delete({
      where: {
        id: assigneeId
      }
    })
    console.log(1)
    await prisma.inboxItem.create({
      data: {
        type: 'taskUnassigned',
        message: 'inbox.messages.task.assignee.deleted',
        relatedType: 'TaskAssignee',
        relatedId: taskAssigneeTryingToDelete.taskId,
        taskId: taskAssigneeTryingToDelete.taskId,
        inboxId: taskAssigneeTryingToDelete.user.inboxes[0].id,
        creatorId: decodedToken.id
      }
    })

    task.assignees.forEach(async (assignee: TaskAssignee) : Promise<any> => {
      await sendPusherNotification(`inbox.${assignee.user.id}`, 'task.unassigned', taskAssigneeTryingToDelete)
    })
  } catch (err) {
    console.log(err)
  }
})
