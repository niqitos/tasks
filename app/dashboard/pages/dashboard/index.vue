<template>
  <WorkspaceView
    v-if="workspaceStore.workspaces.length"
  />

  <WorkspaceCreate v-else />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const route = useRoute()

useSeoMeta({
  title: `${t('dashboard.title')} - ${t('app.name')}`,
  description: t('dashboard.description'),
  ogTitle: `${t('dashboard.title')} - ${t('app.name')}`,
  ogDescription: t('dashboard.description'),
  ogImage: '/web-app-manifest-512.png',
  twitterCard: 'summary_large_image',
  ogUrl: localePath('index')
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: `${config.public.appUrl}${route.path}`
    }
  ]
}))

useRobotsRule({
  index: false,
  follow: false
})

const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

workspaceStore.setWorkspaces()

watch(
  () => workspaceStore.workspaces.value,
  () => {
    workspaceStore.setWorkspaces()
  }
)
</script>
