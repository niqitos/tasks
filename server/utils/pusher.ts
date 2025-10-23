import Pusher from 'pusher'

let pusherInstance: Pusher | null = null

// Initialize Pusher singleton
const getPusherInstance = () => {
  if (!pusherInstance) {
    const config = useRuntimeConfig()

    pusherInstance = new Pusher({
      appId: config.pusherAppId,
      key: config.public.pusherKey,
      secret: config.pusherSecret,
      cluster: config.public.pusherCluster,
      useTLS: true
    })
  }

  return pusherInstance
}

// Simple notification sender
export const sendNotification = async (
  channel: string,
  event: string,
  data: Record<string, any>
) => {
  const pusher = getPusherInstance()

  try {
    await pusher.trigger(channel, event, {
      ...data,
      timestamp: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    console.error('Pusher notification error:', error)
    throw error
  }
}

// Send to multiple channels
export const sendToMultipleChannels = async (
  channels: string[],
  event: string,
  data: Record<string, any>
) => {
  const pusher = getPusherInstance()

  try {
    await pusher.trigger(channels, event, {
      ...data,
      timestamp: new Date().toISOString()
    })
    return { success: true }
  } catch (error) {
    console.error('Pusher multi-channel error:', error)
    throw error
  }
}

// Send to user-specific channel
export const sendToUser = async (
  userId: string | number,
  event: string,
  data: Record<string, any>
) => {
  return sendNotification(`user-${userId}`, event, data)
}

// Batch notifications
export const sendBatchNotifications = async (
  notifications: Array<{
    channel: string
    event: string
    data: Record<string, any>
  }>
) => {
  const pusher = getPusherInstance()

  try {
    const batch = notifications.map(notif =>
      pusher.trigger(notif.channel, notif.event, {
        ...notif.data,
        timestamp: new Date().toISOString()
      })
    )

    await Promise.all(batch)
    return { success: true, count: notifications.length }
  } catch (error) {
    console.error('Pusher batch error:', error)
    throw error
  }
}
