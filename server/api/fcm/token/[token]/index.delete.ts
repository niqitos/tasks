import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()

  try {
    const fcmToken = await getRouterParam(event, 'token')

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    const fcmTokenTryingToDelete = await prisma.fcmToken.findUnique({
      where: {
        token: fcmToken,
        userId: decodedToken.id
      }
    })

    if (!fcmTokenTryingToDelete) {
      throw createError({
        statusCode: 401,
        statusMessage: 'FCM token does not exist',
      })
    }

    // if (fcmTokenTryingToDelete.userId !== decodedToken.id) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: 'Does not have permission to delete FCM token',
    //   })
    // }

    await prisma.fcmToken.delete({
      where: {
        token: fcmToken,
        userId: decodedToken.id
      }
    })
  } catch (err) {
    console.log(err)
  }
})
