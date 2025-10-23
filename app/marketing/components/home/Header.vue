<template>
  <UHeader
    :ui="{
      body: 'p-3 sm:p-5',
      container: 'max-w-full lg:px-6'
    }"
  >
    <template #left>
      <div class="flex items-center text-2xl font-bold">
        <Logo />
      </div>
    </template>

    <!-- <UNavigationMenu
      variant="link"
      :items="items"
    /> -->

    <template #right>
      <UButton
        size="sm"
        :label="t('dashboard.title')"
        :to="localePath('dashboard')"
        icon="i-lucide:layout-dashboard"
        :ui="{
          base: 'hidden lg:inline-flex'
        }"
      />
    </template>

    <template #body>
      <UNavigationMenu
        orientation="vertical"
        :items="navigationItems"
        :ui="{
          link: '!cursor-pointer',
          linkLeadingIcon: 'text-inherit group-hover:text-inherit'
        }"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const jwtCookie = useCookie('TasksJWT')
const userStore = useUserStore()
const localePath = useLocalePath()
const { logout } = useAuth()

const navigationItems = computed<NavigationMenuItem[]>(() => {
  return [
    {
      label: t('dashboard.title'),
      to: localePath('dashboard'),
      icon: 'i-lucide:layout-dashboard'
    },
    {
      label: t('user.edit.button'),
      icon: 'i-lucide:user-round-pen',
      onSelect: ((e: Event) => {
        userStore.edit = true
      })
    },
    {
      label: t('logout.title'),
      icon: 'i-lucide:log-out',
      class: 'text-error hover:!text-error data-highlighted:text-error data-[state=open]:text-error',
      onSelect: ((e: Event) => logout())
    }
  ]
})
</script>
