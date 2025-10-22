import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const task = await getRouterParam(event, 'task') as string

    const body = await readBody(event)

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const newFile = await prisma.file.create({
      data: {
        filename: body.filename,
        url: body.url,
        mimeType: body.mimeType,
        size: body.size,
        taskId: task,
        creatorId: decodedToken.id
      }
    })

    return newFile
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not verify jwt',
    })
  }
})
