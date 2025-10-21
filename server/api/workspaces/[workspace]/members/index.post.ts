import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const workspace = await getRouterParam(event, 'workspace') as string

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
        workspaceId: workspace,
        userId: body.user,
        deletedAt: {
          not: null,
        }
      }
    })

    if (existingWorkspaceMemberTrying) {
      return await prisma.workspaceMember.update({
        where: {
          workspaceId_userId: {
            workspaceId: workspace,
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
            }
          }
        }
      })
    }

    // if (existingWorkspaceMemberTrying.creatorId !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to update board',
    //   })
    // }

    const workspaceMember = await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace,
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
          }
        }
      }
    })

    return workspaceMember
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not verify jwt',
    })
  }
})
