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
      <ULocaleSelect
        v-model="locale"
        variant="none"
        :locales="locales.map((l: LocaleObject) => ({
          name: l.name?.substring(0, 3),
          code: l.code,
          dir: l.dir
        }))"
        :ui="{
          base: 'text-muted hover:!text-default cursor-pointer',
          trailingIcon: 'text-inherit'
        }"
        @update:model-value="setLocale($event as SupportedLocale)"
      />

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
import type { LocaleObject } from '@nuxtjs/i18n'

const { t, locale, locales, setLocale: setI18nLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const menu = ref<NavigationMenuItem[]>([
  {
    label: t('home.title'),
    to: localePath('index'),
    icon: 'i-lucide:house'
  }
])


const setLocale = (value: SupportedLocale) => {
  if (locales.value.filter((i: LocaleObject) => i.code !== value)) {
    setI18nLocale(value)

    location.href = switchLocalePath(value)
  }
}
</script>
