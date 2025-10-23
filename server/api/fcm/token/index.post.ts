import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { prisma } from '@@/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const { token: fcmToken, deviceId, platform, browser } = body

    const cookies = parseCookies(event)
    const token = cookies.TasksJWT

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

    if (!decodedToken?.id || !token) {
      throw createError({
        statusCode: 400,
        message: 'userId and token are required'
      })
    }

    console.log({
        token: fcmToken,
        userId: decodedToken.id,
        deviceId,
        platform,
        browser
      })
    const savedToken = await prisma.fcmToken.create({
      data: {
        token: fcmToken,
        userId: decodedToken.id,
        deviceId,
        platform,
        browser
      }
    })

    // Subscribe to default topic
    // await subscribeToTopic(token, 'all-users')

    return {
      success: true,
      message: 'FCM token saved successfully',
      tokenId: savedToken.id
    }
  } catch (error) {
    console.error('Error saving FCM token:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to save FCM token'
    })
  }
})
