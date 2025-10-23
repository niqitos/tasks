<template>
  <UDashboardGroup class="h-[calc(100vh-var(--ui-header-height))] relative">
    <UDashboardPanel
      id="inbox-1"
      :default-size="25"
      :min-size="20"
      :max-size="30"
      resizable
    >
      <UDashboardNavbar
        :title="$t('inbox.title')"
      >
        <!-- <template #leading>
          <UDashboardSidebarCollapse />
        </template> -->

        <template #trailing>
          <UBadge
            :label="filteredInboxItems.length"
            variant="subtle"
          />
        </template>

        <template #right>
          <UTabs
            v-model="selectedTab"
            :items="tabItems"
            :content="false"
            size="xs"
          />
        </template>
      </UDashboardNavbar>

      <InboxList
        v-model="selectedInboxItem"
        :selected-tab="selectedTab"
      />
    </UDashboardPanel>

    <InboxItem
      v-if="selectedInboxItem"
      v-model="selectedInboxItem"
      @close="selectedInboxItem = null"
    />

    <div
      v-else
      class="hidden lg:flex flex-1 items-center justify-center"
    >
      <UIcon
        name="i-lucide:inbox"
        class="size-32 text-dimmed"
      />
    </div>

    <ClientOnly>
      <USlideover
        v-if="isMobile"
        v-model:open="isInboxItemPanelOpen"
      >
        <template #content>
          <InboxItem
            v-if="selectedInboxItem"
            v-model="selectedInboxItem"
            @close="selectedInboxItem = null"
          />
        </template>
      </USlideover>
    </ClientOnly>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import type { TabsItem } from '@nuxt/ui'

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const { t } = useI18n()

const inboxStore = useInboxStore()

const tabItems = ref<TabsItem[]>([
  {
    label: t('inbox.filter.all'),
    value: 'all'
  },
  {
    label: t('inbox.filter.unread'),
    value: 'unread'
  }
])

const selectedTab = ref<'all' | 'unread'>('all')

const filteredInboxItems = computed<InboxItem[]>(() => {
  if (selectedTab.value === 'unread') {
    return inboxStore.inboxItems.filter(message => !message.isRead)
  }

  return inboxStore.inboxItems
})

const selectedInboxItem = ref<InboxItem | null>()

const isInboxItemPanelOpen = computed({
  get() {
    return !!selectedInboxItem.value
  },
  set(value: boolean) {
    if (!value) {
      selectedInboxItem.value = null
    }
  }
})

watch(filteredInboxItems, () => {
  if (!filteredInboxItems.value.find(message => message.id === selectedInboxItem.value?.id)) {
    selectedInboxItem.value = null
  }
})

watch(selectedInboxItem, () => {
  const index = filteredInboxItems.value.findIndex(message => message.id === selectedInboxItem.value?.id)
  if (selectedInboxItem.value && index !== -1) {
    filteredInboxItems.value[index] = selectedInboxItem.value
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')
</script>
