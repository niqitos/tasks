import Pusher from 'pusher'

let pusherInstance: Pusher | null = null

const getPusherInstance = () => {
  if (!pusherInstance) {
    const config = useRuntimeConfig()

    pusherInstance = new Pusher({
      appId: config.pusherAppId,
      key: config.public.pusherKey,
      secret: config.pusherSecret,
      cluster: config.public.pusherCluster,
      useTLS: config.public.pusherUseTls === 'true'
    })
  }

  return pusherInstance
}

export const sendPusherNotification = async (
  channel: string,
  event: string,
  data: Record<string, any>
) => {
  const pusher = getPusherInstance()

  try {
    const trigger = await pusher.trigger(channel, event, {
      ...data,
      timestamp: new Date().toISOString()
    })
    console.log(trigger)
    return {
      success: true
    }
  } catch (error) {
    console.error('Pusher notification error:', error)

    throw error
  }
}
