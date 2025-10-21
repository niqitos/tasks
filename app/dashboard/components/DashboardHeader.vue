<template>
  <UHeader
    :ui="{
      body: 'p-3  sm:p-5',
      container: 'max-w-full'
    }"
  >
    <template #left>
      <div class="flex items-center text-2xl font-bold">
        <Logo />
        <template v-if="workspaceStore.workspaces.length">
          &nbsp;/&nbsp;
          <WorkspaceManager />
          <WorkspaceMembersModal />
        </template>
      </div>
    </template>

    <!-- <UNavigationMenu
      variant="link"
      :items="items"
    /> -->

    <template #right>
      <UDropdownMenu
        v-if="userStore.user"
        :items="menu"
        class="hidden lg:block"
        :ui="{
          item: '!cursor-pointer',
          itemLeadingIcon: 'text-inherit group-hover:!text-inherit'
        }"
      >
        <UButton
          :avatar="{
            src: userStore.user.avatar,
            alt: userStore.fullname,
            icon: userStore.fullname ? '' : 'i-lucide:user'
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
        :items="menu"
        :ui="{
          link: '!cursor-pointer',
          linkLeadingIcon: 'text-inherit group-hover:text-inherit'
        }"
      />
    </template>
  </UHeader>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const jwtCookie = useCookie('TasksJWT')
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const localePath = useLocalePath()
const route = useRoute()

const workspaceStore = useWorkspaceStore()

const menu = computed(() => ([
  [
    {
      label: userStore.fullname,
      avatar: {
        src: userStore.user.avatar,
        alt: `${userStore.user.name}${userStore.user.lastname ? ` ${userStore.user.lastname}` : ''}`,
        icon: userStore.user.name || userStore.user.lastname ? '' : 'i-lucide:user'
      },
      type: 'label'
    }
  ],
  [
    {
      icon: route.path === localePath('dashboard') ? 'i-lucide:calendar-days' : 'i-lucide:square-kanban',
      to: route.path === localePath('dashboard') ? localePath('calendar') : localePath('dashboard'),
      label: route.path === localePath('dashboard') ? t('view.calendar') : t('view.boards')
    }
  ],
  [
    {
      label: t('settings.edit.button'),
      icon: 'i-lucide:settings',
      onSelect: ((e: Event) => {
        settingsStore.edit = true
      })
    },
    {
      label: t('user.edit.button'),
      icon: 'i-lucide:user-round-pen',
      onSelect: ((e: Event) => {
        userStore.edit = true
      })
    }
  ],
  [
    {
      label: $t(`plans.${userStore.user.plan}.upgrade`),
      icon: 'i-lucide:circle-fading-arrow-up',
      class: 'text-primary hover:!text-primary data-highlighted:text-primary data-[state=open]:text-primary',
      to: localePath('upgrade')
    }
  ],
  [
    {
      label: t('logout.title'),
      icon: 'i-lucide:log-out',
      class: 'text-error hover:!text-error data-highlighted:text-error data-[state=open]:text-error',
      onSelect: ((e: Event) => logout())
    }
  ]
]))

const logout = () => {
  jwtCookie.value = null

  return navigateTo(localePath('login'), { external: true })
}
</script>
