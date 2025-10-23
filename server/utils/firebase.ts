import admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin'

let firebaseApp: admin.app.App | null = null

// Initialize Firebase Admin
const getFirebaseAdmin = () => {
  if (!firebaseApp) {
    const config = useRuntimeConfig()

    // Option 1: Using service account JSON
    const serviceAccount: ServiceAccount = {
      projectId: config.firebaseProjectId,
      clientEmail: config.firebaseClientEmail,
      privateKey: config.firebasePrivateKey.replace(/\\n/g, '\n')
    }

    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }

  return firebaseApp
}

// Send notification to single device token
export const sendFCMNotification = async (
  token: string,
  notification: {
    title: string
    body: string
    imageUrl?: string
  },
  data?: Record<string, string>
) => {
  const app = getFirebaseAdmin()

  try {
    const response = await app.messaging().send({
      token,
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl
      },
      data: data || {},
      webpush: {
        fcmOptions: {
          link: data?.link || '/'
        }
      }
    })

    return { success: true, messageId: response }
  } catch (error) {
    console.error('FCM send error:', error)
    throw error
  }
}

// Send to multiple device tokens
export const sendFCMToMultipleDevices = async (
  tokens: string[],
  notification: {
    title: string
    body: string
    imageUrl?: string
  },
  data?: Record<string, string>
) => {
  const app = getFirebaseAdmin()

  try {
    const response = await app.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl
      },
      data: data || {},
      webpush: {
        fcmOptions: {
          link: data?.link || '/'
        }
      }
    })

    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses
    }
  } catch (error) {
    console.error('FCM multicast error:', error)
    throw error
  }
}

// Send to topic
export const sendFCMToTopic = async (
  topic: string,
  notification: {
    title: string
    body: string
    imageUrl?: string
  },
  data?: Record<string, string>
) => {
  const app = getFirebaseAdmin()

  try {
    const response = await app.messaging().send({
      topic,
      notification: {
        title: notification.title,
        body: notification.body,
        imageUrl: notification.imageUrl
      },
      data: data || {},
      webpush: {
        fcmOptions: {
          link: data?.link || '/'
        }
      }
    })

    return { success: true, messageId: response }
  } catch (error) {
    console.error('FCM topic send error:', error)
    throw error
  }
}

// Subscribe tokens to topic
export const subscribeToTopic = async (
  tokens: string | string[],
  topic: string
) => {
  const app = getFirebaseAdmin()
  const tokenArray = Array.isArray(tokens) ? tokens : [tokens]

  try {
    const response = await app.messaging().subscribeToTopic(tokenArray, topic)
    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount
    }
  } catch (error) {
    console.error('FCM subscribe error:', error)
    throw error
  }
}

// Unsubscribe tokens from topic
export const unsubscribeFromTopic = async (
  tokens: string | string[],
  topic: string
) => {
  const app = getFirebaseAdmin()
  const tokenArray = Array.isArray(tokens) ? tokens : [tokens]

  try {
    const response = await app.messaging().unsubscribeFromTopic(tokenArray, topic)
    return {
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount
    }
  } catch (error) {
    console.error('FCM unsubscribe error:', error)
    throw error
  }
}

// Send data-only message (silent notification)
export const sendDataMessage = async (
  token: string,
  data: Record<string, string>
) => {
  const app = getFirebaseAdmin()

  try {
    const response = await app.messaging().send({
      token,
      data
    })

    return { success: true, messageId: response }
  } catch (error) {
    console.error('FCM data message error:', error)
    throw error
  }
}
