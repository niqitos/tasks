<template>
  <UHeader>
    <template #left>
      <UButton
        variant="link"
        color="neutral"
        :to="localePath('index')"
        :label=" $t('app.name')"
        icon='i-lucide:square-kanban'
        :ui="{
          base: 'text-2xl font-bold text-default',
          leadingIcon: 'size-8 text-primary'
        }"
      />
    </template>

    <UNavigationMenu
      variant="link"
      :items="menu"
    />

    <template #right>
      <UColorModeSelect variant="none" />
    </template>

    <template #body>
      <UNavigationMenu
        orientation="vertical"
        :items="menu"
        class="-mx-2.5"
      />

      <UContentNavigation
        highlight
        :navigation="navigation"
        :type="'single'"
        :default-open="true"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()

const menu = ref<NavigationMenuItem[]>([
  {
    label: t('home.title'),
    to: localePath('index'),
    icon: 'i-lucide:house'
  }
])
</script>
