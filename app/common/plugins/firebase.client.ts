import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, type Messaging } from 'firebase/messaging'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  }

  const app = initializeApp(firebaseConfig)
  let messaging: Messaging | null = null

  // Initialize messaging only if supported
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      messaging = getMessaging(app)
    } catch (error) {
      console.error('Firebase messaging initialization failed:', error)
    }
  }

  return {
    provide: {
      firebase: app,
      messaging
    }
  }
})
