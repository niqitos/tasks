import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const id = await getRouterParam(event, 'id')
    const assignee = Number(await getRouterParam(event, 'user'))

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

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
