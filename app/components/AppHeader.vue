<template>
  <UHeader
    :ui="{
      container: 'max-w-full'
    }"
  >
    <template #left>
      <Logo />
    </template>

    <!-- <UNavigationMenu
      variant="link"
      :items="items"
    /> -->

    <template #right>
      <ULocaleSelect
        v-model="locale"
        variant="none"
        :locales="locales"
        :ui="{
          base: 'cursor-pointer hidden sm:block',
        }"
        @update:model-value="setLocale($event as SupportedLocale)"
      />

      <UColorModeSelect
        variant="none"
        class="cursor-pointer hidden sm:block"
      />

      <UDropdownMenu
        v-if="userStore.user"
        :items="dropdownItems"
        class="hidden lg:block"
        :ui="{
          item: '!cursor-pointer',
          itemLeadingIcon: 'text-inherit group-hover:!text-inherit'
        }"
      >
        <UButton
          :avatar="{
            src: userStore.user.avatar,
            alt: `${userStore.user.name}${userStore.user.lastname ? ` ${userStore.user.lastname}` : ''}`,
            icon: userStore.user.name || userStore.user.lastname ? '' : 'i-lucide:user'
          }"
          color="neutral"
          variant="link"
          :ui="{
            base: 'p-0',
            leadingAvatar: 'size-8',
            leadingAvatarSize: 'md'
          }"
        />
      </UDropdownMenu>
    </template>

    <template #body>
      <UNavigationMenu
        orientation="vertical"
        :items="navigationItems"
        class="-mx-2.5"
        :ui="{
          link: '!cursor-pointer',
          linkLeadingIcon: 'text-inherit group-hover:text-inherit'
        }"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui'
import type { LocaleObject } from '@nuxtjs/i18n'

const { t, locale, locales: i18nLocales, setLocale: setI18nLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const jwtCookie = useCookie('TasksJWT')
const userStore = useUserStore()

const navigationItems = ref<NavigationMenuItem[]>([
  // {
  //   label: t('home.title'),
  //   to: localePath('index'),
  //   icon: 'i-lucide:house'
  // },
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
    onSelect: ((e: Event) => {
      jwtCookie.value = null
      return navigateTo('/login')
    })
  }
])

const dropdownItems = ref<DropdownMenuItem[]>([
  // {
  //   label: t('home.title'),
  //   to: localePath('index'),
  //   icon: 'i-lucide:house'
  // },
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
    class: 'text-error hover:!text-error',
    onSelect: ((e: Event) => {
      jwtCookie.value = null
      return navigateTo('/login')
    })
  }
])

const locales = ref<any>(i18nLocales.value.map((l: LocaleObject) => ({
  name: l.name?.substring(0, 3),
  code: l.code,
  dir: l.dir
})))

const setLocale = (value: SupportedLocale) => {
  if (i18nLocales.value.filter((i: LocaleObject) => i.code !== value)) {
    setI18nLocale(value)

    location.href = switchLocalePath(value)
  }
}
</script>
