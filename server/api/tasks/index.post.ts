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

    const newTask = await prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        position: body.position,
        boardId: body.boardId,
        creatorId: decodedToken.id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            lastname: true,
            avatar: true
          }
        },
        assignees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                lastname: true,
                avatar: true
              }
            }
          }
        },
        comments: true,
        files: {
          where: {
            deletedAt: null
          }
        }
      }
    })

    return newTask
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not verify jwt',
    })
  }
})
