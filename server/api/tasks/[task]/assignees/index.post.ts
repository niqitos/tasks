import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

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

    const existingTaskAssigneeTrying = await prisma.taskAssignee.findFirst({
      where: {
        taskId,
        userId: body.user,
        deletedAt: {
          not: null,
        }
      }
    })

    if (existingTaskAssigneeTrying) {
      return await prisma.taskAssignee.update({
        where: {
          taskId_userId: {
            taskId,
            userId: body.user
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
              plan: true
            }
          }
        }
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
        }
      }
    })

    if (!task) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    // if (existingTaskAssigneeTrying.creatorId !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to update board',
    //   })
    // }

    const taskAssignee = await prisma.taskAssignee.create({
      data: {
        taskId,
        userId: body.user,
        assignerId: decodedToken.id
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

    await prisma.inboxItem.create({
      data: {
        type: 'taskCreated',
        message: 'inbox.messages.task.assignee.created',
        relatedType: 'TaskAssignee',
        relatedId: task.id,
        taskId: task.id,
        inboxId: taskAssignee.user.inboxes[0].id,
        creatorId: taskAssignee.assignerId
      }
    })

    return taskAssignee
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not verify jwt',
    })
  }
})
