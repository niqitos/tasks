import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const { content, parentId } = body
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

    if (!content || !taskId) {
      throw createError({
        statusCode: 400,
        message: 'Missing required fields'
      })
    }

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      },
      include: {
        assignees: {
          select: {
            user: {
              select: {
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

    if (!task) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task does not exist',
      })
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        taskId,
        authorId: decodedToken.id,
        parentId: parentId || null
      },
      include: {
        author: true,
        replies: true
      }
    })

    task.assignees.forEach(async (taskAssignee: any) => {
      await prisma.inboxItem.create({
        data: {
          type: 'commentAdded',
          message: 'inbox.messages.task.comment.created',
          relatedType: 'Comment',
          relatedId: comment.id,
          commentId: comment.id,
          taskId: task.id,
          inboxId: taskAssignee.user.inboxes[0].id,
          creatorId: decodedToken.id
        }
      })
    })

    return comment
  } catch (err) {
    console.log(err)
  }
})
