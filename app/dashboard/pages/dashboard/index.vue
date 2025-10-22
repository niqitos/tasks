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

const workspaces = ref<any>(await $fetch('/api/workspaces'))

watch(
  () => workspaces.value,
  () => {
    if (workspaces.value.length > 0) {
      workspaceStore.workspaces = workspaces.value

      let workspace = workspaceStore.workspaces.find((w: any) => w.id === localStorage.getItem('workspace.current.id'))

      if (!workspace && workspaceStore.workspaces.length > 0 && workspaceStore.workspaces[0]) {
        workspace = workspaceStore.workspaces[0]

        localStorage.setItem('workspace.current.id', workspace.id)
      }

      workspaceStore.current = workspace

      boardStore.boards = workspaceStore.current?.boards || []
    }
  },
  {
    immediate: true
  }
)
</script>
