import { getToken, onMessage } from 'firebase/messaging'

export const useFirebaseMessaging = () => {
  const { $messaging } = useNuxtApp()
  const config = useRuntimeConfig()
  const fcmToken = ref<string | null>(null)
  const permission = ref<NotificationPermission>('default')

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications')
      return false
    }

    try {
      permission.value = await Notification.requestPermission()
      return permission.value === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  const getFCMToken = async () => {
    if (!$messaging) {
      console.error('Firebase messaging not initialized')
      return null
    }

    try {
      const hasPermission = await requestPermission()

      if (!hasPermission) {
        // console.log('Notification permission denied')
        return null
      }
      const token = await getToken($messaging, {
        vapidKey: config.public.firebaseVapidKey
      })

      fcmToken.value = token

      return token
    } catch (error) {
      console.error('Error getting FCM token:', error)
      return null
    }
  }

  const onForegroundMessage = (callback: (payload: any) => void) => {
    if (!$messaging) {
      console.error('Firebase messaging not initialized')
      return
    }

    onMessage($messaging, (payload) => {
      // console.log('Foreground message received:', payload)
      callback(payload)
    })
  }

  return {
    fcmToken,
    permission,
    requestPermission,
    getFCMToken,
    onForegroundMessage
  }
}
