import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access user',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        avatar: true,
        plan: true
      }
    })

    return user
  } catch (err) {
    console.log(err)
  }
})
