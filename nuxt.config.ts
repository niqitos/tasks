import { join } from 'path'
import { readFileSync, writeFileSync, existsSync } from 'fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Tasks' },
        { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#0f172b', media: '(prefers-color-scheme: dark)' }

      ],
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: 'favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: 'apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' }
      ]
    }
  },
  css: [
    '@/assets/css/main.css'
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt'
  ],

  i18n: {
    locales: [
      {
        name: 'Українська',
        code: 'uk',
        language: process.env.COUNTRY ? `uk-${process.env.COUNTRY.toUpperCase()}` : 'uk',
        file: 'uk.js',
        isCatchallLocale: true
      },
      {
        name: 'Русский',
        code: 'ru',
        language: process.env.COUNTRY ? `ru-${process.env.COUNTRY.toUpperCase()}` : 'ru',
        file: 'ru.js'
      },
      {
        name: 'English',
        code: 'en',
        language: process.env.COUNTRY ? `en-${process.env.COUNTRY.toUpperCase()}` : 'en',
        file: 'en.js'
      }
    ],
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: process.env.DEFAULT_LOCALE as 'uk' | 'ru' | 'en' | undefined,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: process.env.DEFAULT_LOCALE as 'uk' | 'ru' | 'en' | undefined
    },
    experimental: {
      localeDetector: 'localeDetector.ts'
    }
  },

  compatibilityDate: '2025-10-08',

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,

    monobankApiBase: process.env.MONOBANK_API_BASE,
    monobankMerchantId: process.env.MONOBANK_MERCHANT_ID,
    monobankSecret: process.env.MONOBANK_SECRET,
    monobankWebhookSecret: process.env.MONOBANK_WEBHOOK_SECRET,

    pusherAppId: process.env.NUXT_PUSHER_APP_ID || '',
    pusherSecret: process.env.NUXT_PUSHER_SECRET || '',

    firebaseProjectId: process.env.NUXT_SERVER_FIREBASE_PROJECT_ID || '',
    firebaseClientEmail: process.env.NUXT_SERVER_FIREBASE_CLIENT_EMAIL || '',
    firebasePrivateKey: process.env.NUXT_SERVER_FIREBASE_PRIVATE_KEY || '',
    public: {
      appUrl: process.env.NUXT_PUBLIC_SITE_URL,

      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseBucket: process.env.SUPABASE_BUCKET,

      pusherKey: process.env.NUXT_PUBLIC_PUSHER_KEY || '',
      pusherCluster: process.env.NUXT_PUBLIC_PUSHER_CLUSTER || 'eu',
      pusherUseTls: process.env.NUXT_PUBLIC_PUSHER_USE_TLS,

      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseVapidKey: process.env.NUXT_PUBLIC_FIREBASE_VAPID_KEY
    }
  },
  extends: [
    './app/common',
    './app/auth',
    './app/dashboard',
    './app/marketing'
  ],
  routeRules: {
    '/calendar/**': {
      ssr: false
    },
    '/dashboard/**': {
      ssr: false
    },
    '/inbox/**': {
      ssr: false
    }
  },
  imports: {
    dirs: [
      // Auto-import stores from layers
      'stores',
      '@/common/stores',
      '@/auth/stores',
      '@/dashboard/stores',
      '@/marketing/stores'
    ]
  },

  pwa: {
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'web-app-manifest-192x192.png',
      'web-app-manifest-512x512.png'
    ],
    client: {
      installPrompt: true
    },
    manifest: {
      name: 'Tasks',
      short_name: 'Tasks',
      description: 'Collaborate with your team in real time.',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      icons: [
        {
          "src": "/web-app-manifest-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "/web-app-manifest-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: [
        '**/*.{js,css,html,svg,png,ico,json}'
      ],
      // runtimeCaching: [
      //   {
      //     urlPattern: ({ request }) => request.mode === 'navigate',
      //     handler: 'NetworkFirst',
      //     options: {
      //       cacheName: 'html-cache'
      //     }
      //   },
      //   {
      //     urlPattern: ({ request }) => request.destination === 'document',
      //     handler: 'NetworkFirst',
      //     options: {
      //       cacheName: 'html-cache'
      //     }
      //   },
      //   {
      //     urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
      //     handler: 'StaleWhileRevalidate',
      //     options: {
      //       cacheName: 'asset-cache'
      //     }
      //   },
      //   {
      //     urlPattern: ({ request }) => request.destination === 'image',
      //     handler: 'CacheFirst',
      //     options: {
      //       cacheName: 'image-cache',
      //       expiration: {
      //         maxEntries: 100,
      //         maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
      //       }
      //     }
      //   }
      // ]
    },
    devOptions: {
      enabled: true
    }
  },

  sitemap: {
    exclude: [
      '/calendar/**',
      '/dashboard/**',
      '/inbox/**'
    ]
  },

  nitro: {
    hooks: {
      'build:before': () => {
        const templatePath = join(process.cwd(), 'public', 'firebase-messaging-sw.template.js')
        const outputPath = join(process.cwd(), 'public', 'firebase-messaging-sw.js')

        if (existsSync(templatePath)) {
          let swContent = readFileSync(templatePath, 'utf8')

          swContent = swContent
            .replace('__FIREBASE_API_KEY__', process.env.FIREBASE_API_KEY || '')
            .replace('__FIREBASE_AUTH_DOMAIN__', process.env.FIREBASE_AUTH_DOMAIN || '')
            .replace('__FIREBASE_PROJECT_ID__', process.env.FIREBASE_PROJECT_ID || '')
            .replace('__FIREBASE_STORAGE_BUCKET__', process.env.FIREBASE_STORAGE_BUCKET || '')
            .replace('__FIREBASE_MESSAGING_SENDER_ID__', process.env.FIREBASE_MESSAGING_SENDER_ID || '')
            .replace('__FIREBASE_APP_ID__', process.env.FIREBASE_APP_ID || '')
            .replace('__FIREBASE_MEASUREMENT_ID__', process.env.FIREBASE_MEASUREMENT_ID || '')

          writeFileSync(outputPath, swContent)
        }
      }
    }
  }
})
