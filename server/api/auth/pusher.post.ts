import Pusher from 'pusher'
import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'

export default defineEventHandler(async (event) : Promise<any> => {
  const config = useRuntimeConfig()
  const cookies = parseCookies(event)
  const token = cookies.TasksJWT

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Not authorized to update',
    })
  }

  const decodedToken = await jwt.verify(token, config.jwtSecret) as JwtPayload

  const pusher = new Pusher({
    appId: config.pusherAppId,
    key: config.public.pusherKey,
    secret: config.pusherSecret,
    cluster: config.public.pusherCluster,
    useTLS: config.public.pusherUseTls
  })

  const body = await readBody(event)
  const { socketId, channelName } = body

  const auth = pusher.authorizeChannel(socketId, channelName)

  return auth
})
