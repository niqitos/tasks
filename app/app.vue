<template>
  <UApp :locale="locales[locale]">
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script lang="ts" setup>
import * as locales from '@nuxt/ui/locale'
import type { Channel } from 'pusher-js'

const { locale } = useI18n()

const { subscribe, unsubscribe, bind, unbind } = usePusher()
// const messages = ref<Array<{ text: string; timestamp: string }>>([])

const { fcmToken, getFCMToken, onForegroundMessage } = useFirebaseMessaging()
const firebaseMessages = ref<Array<{ text: string; source: string; timestamp: string }>>([])

let channel: Channel | null = null

const setupPusher = () => {
  channel = subscribe('inbox')

  bind(channel, 'event', (data: any) => {
    // pusherMessages.value.push({
    //   text: data.message,
    //   source: 'Pusher',
    //   timestamp: new Date().toLocaleTimeString()
    // })
  })
}

const setupFirebase = async () => {
  const token = await getFCMToken()

  if (!!token) {
    const oldToken = localStorage.getItem('fcmToken')

    if (token !== oldToken) {
      const ua = navigator.userAgent

      // Get browser
      let browser = 'Unknown'
      if (ua.includes('Firefox/')) browser = 'Firefox'
      else if (ua.includes('Chrome/') && !ua.includes('Edg')) browser = 'Chrome'
      else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Safari'
      else if (ua.includes('Edg/')) browser = 'Edge'
      else if (ua.includes('Opera/') || ua.includes('OPR/')) browser = 'Opera'

      // Get platform
      let platform = 'web'
      if (ua.includes('Android')) platform = 'android'
      else if (ua.includes('iPhone') || ua.includes('iPad')) platform = 'ios'
      else if (ua.includes('Windows')) platform = 'windows'
      else if (ua.includes('Mac')) platform = 'mac'
      else if (ua.includes('Linux')) platform = 'linux'

      // Generate device ID (persistent in localStorage)
      let deviceId = localStorage.getItem('deviceId')
      if (!deviceId) {
        deviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem('deviceId', deviceId)
      }

      const { data } = await useFetch<any>('/api/fcm/token', {
        method: 'POST',
        body: {
          token,
          browser,
          platform,
          deviceId
        }
      })

      localStorage.setItem('fcmToken', token)
    }

    onForegroundMessage((payload) => {
      firebaseMessages.value.push({
        text: payload.notification?.body || 'No message',
        source: 'Firebase',
        timestamp: new Date().toLocaleTimeString()
      })

      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'New Message', {
          body: payload.notification?.body,
          icon: '/icon.png'
        })
      }
    })
  }
}

onMounted(() => {
  setupPusher()
  setupFirebase()
})

onBeforeUnmount(() => {
  if (channel) {
    unbind(channel, 'event')
    unsubscribe('inbox')
  }
})
</script>
