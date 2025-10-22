import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const task = await getRouterParam(event, 'task')
    const assignee = Number(await getRouterParam(event, 'assignee'))

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
        id: assignee
      }
    })

    if (!taskAssigneeTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task assignee does not exist',
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
        id: assignee
      }
    })
  } catch (err) {
    console.log(err)
  }
})
