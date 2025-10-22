import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const task = await getRouterParam(event, 'task') as string

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
        taskId: task,
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
            taskId: task,
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

    // if (existingTaskAssigneeTrying.creatorId !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to update board',
    //   })
    // }

    const newTaskAssignee = await prisma.taskAssignee.create({
      data: {
        taskId: task,
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
            plan: true
          }
        }
      }
    })

    return newTaskAssignee
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not verify jwt',
    })
  }
})
