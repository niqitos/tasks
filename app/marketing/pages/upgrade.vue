<template>
  <UContainer>
    <UPageHeader
      :title="$t('upgrade.title')"
      :headline="$t('upgrade.headline')"
      :ui="{
        root: 'border-none'
      }"
    />

    <PlansTable />
  </UContainer>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const route = useRoute()

useSeoMeta({
  title: `${t('upgrade.title')} - ${t('app.name')}`,
  description: t('upgrade.description'),
  ogTitle: `${t('upgrade.title')} - ${t('app.name')}`,
  ogDescription: t('upgrade.description'),
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
  index: true,
  follow: true
})
</script>
