import jwt from 'jsonwebtoken'
import prisma from '@@/server/utils/prisma'

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

    const decodedToken = await jwt.verify(token, config.jwtSecret)

    const user = await prisma.user.findFirst({
      where: {
        id: decodedToken.id
      }
    })

    return user
  } catch (err) {
    console.log(err)
  }
})
