import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const workspace = await prisma.workspace.create({
      data: {
        name: body.name,
        description: body.description,
        creatorId: decodedToken.id
      }
    })

    const member = await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: decodedToken.id,
        role: 'ADMIN',
        invitedById: decodedToken.id
      }
    })

    const defaultBoards = [
      {
        position: 1,
        name: 'To Do',
        description: 'Tasks waiting to be started'
      },
      {
        position: 2,
        name: 'In Progress',
        description: 'Tasks currently in progress'
      },
      {
        position: 3,
        name: 'Done',
        description: 'Completed tasks'
      }
    ]

    for (const board of defaultBoards) {
      await prisma.board.create({
        data: {
          name: board.name,
          description: board.description,
          position: board.position,
          workspaceId: workspace.id,
          creatorId: decodedToken.id
        }
      })
    }

    return workspace
  } catch (err) {
    throw err
    // throw createError({
    //   statusCode: 500,
    //   statusMessage: 'Could not verify jwt',
    // })
  }
})
