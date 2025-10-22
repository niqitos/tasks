import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
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

    return await prisma.comment.create({
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
  } catch (err) {
    console.log(err)
  }
})
