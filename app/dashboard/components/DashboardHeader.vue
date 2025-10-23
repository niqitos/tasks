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
            src: userStore.user?.avatar,
            alt: userStore.fullname,
            icon: userStore.fullname ? '' : 'i-lucide:user',
            chip: inboxStore.inboxItemsRead.length ? {
              inset: true
            } : false
          }"
          color="neutral"
          variant="link"
          :ui="{
            base: 'p-0',
            leadingAvatar: 'size-8',
            leadingAvatarSize: 'md'
          }"
        />

        <template #item-leading="{ item }">
          <UChip
            v-if="item.to === localePath('inbox') && inboxStore.inboxItemsRead.length"
            color="primary"
          >
            <UIcon
              :name="item.icon"
              class="shrink-0 group-data-highlighted:text-default group-data-[state=open]:text-default transition-colors size-5 text-inherit group-hover:!text-inherit"
            />
          </UChip>

          <UIcon
            v-else
            :name="item.icon"
            class="shrink-0 group-data-highlighted:text-default group-data-[state=open]:text-default transition-colors size-5 text-inherit group-hover:!text-inherit"
          />
        </template>
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
const { logout } = useAuth()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const localePath = useLocalePath()
const route = useRoute()

const workspaceStore = useWorkspaceStore()
const roleStore = useRoleStore()
const inboxStore = useInboxStore()

const menu = computed<any>(() => {
  const items: any = [
    [
      {
        label: userStore.fullname,
        avatar: {
          src: userStore.user?.avatar,
          alt: `${userStore.user?.name}${userStore.user?.lastname ? ` ${userStore.user.lastname}` : ''}`,
          icon: userStore.user?.name || userStore.user?.lastname ? '' : 'i-lucide:user'
        },
        type: 'label'
      },
      {
        icon: 'i-lucide:inbox',
        to: localePath('inbox'),
        label: t('inbox.title')
      }
    ]
  ]

  if (route.path.startsWith(localePath('dashboard'))) {
    items.push([
      {
        icon: 'i-lucide:calendar-days',
        to: localePath('calendar'),
        label: t('view.calendar')
      }
    ])
  } else if ((roleStore.canViewCalendar && route.path.startsWith(localePath('calendar'))) || route.path.startsWith(localePath('inbox'))) {
    items.push([
      {
        icon: 'i-lucide:square-kanban',
        to: localePath('dashboard'),
        label: t('view.boards')
      }
    ])
  }

  items.push([
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
      label: $t(`plans.${userStore.user?.plan}.upgrade`),
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
  ])

  return items
})
</script>
