import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const user = await getRouterParam(event, 'user')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const userTryingToUpdate = await prisma.user.findUnique({
      where: {
        id: user
      }
    })

    if (!userTryingToUpdate) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User does not exist',
      })
    }

    await prisma.user.update({
      where: {
        id: user
      },
      data: body
    })
  } catch (err) {
    console.log(err)
  }
})
