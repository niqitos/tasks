import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'
import { getUpdatedFields } from '@@/server/utils/diff'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const taskId = await getRouterParam(event, 'task') as string

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const taskTryingToUpdate = await prisma.task.findUnique({
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
          select: {
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
        }
      }
    })

    if (!taskTryingToUpdate) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    if (taskTryingToUpdate.creatorId !== decodedToken.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update task'
      })
    }

    const task = await prisma.task.update({
      where: {
        id: taskId
      },
      data: body
    })

    const now = new Date()

    await prisma.activityLog.create({
      data: {
        logName: 'default',
        description: 'Task updated',
        subjectId: task.id,
        subjectType: 'Task',
        event: 'updated',
        causedById:  decodedToken.id,
        properties: getUpdatedFields(taskTryingToUpdate, task, ['updatedAt'])
      }
    })

    if (taskTryingToUpdate.completedAt !== task.completedAt) {
      taskTryingToUpdate.assignees.forEach(async (taskAssignee: any) => {
        await prisma.inboxItem.create({
          data: {
            type: task.completedAt ? 'taskCompleted' : 'taskReopened',
            message: `inbox.messages.task.${task.completedAt ? 'completed' : 'reopened'}`,
            relatedType: 'Task',
            relatedId: task.id,
            taskId: task.id,
            inboxId: taskAssignee.user.inboxes[0].id,
            creatorId: decodedToken.id
          }
        })

        await sendPusherNotification(`inbox.${taskAssignee.user.id}`, 'task.updated', task)
      })
    }
  } catch (err) {
    console.log(err)
  }
})
