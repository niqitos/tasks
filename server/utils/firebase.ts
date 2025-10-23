import admin from 'firebase-admin'
import type { ServiceAccount } from 'firebase-admin'

let firebaseApp: admin.app.App | null = null

const getFirebaseAdmin = () => {
  if (!firebaseApp) {
    const config = useRuntimeConfig()

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
