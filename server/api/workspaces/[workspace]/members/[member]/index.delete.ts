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
      }
    })

    if (!workspaceMemberTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Task assignee does not exist',
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
  } catch (err) {
    console.log(err)
  }
})
