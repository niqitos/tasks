<template>
  <div class="flex h-[calc(100vh-var(--ui-header-height))] overflow-clip">
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
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

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
        :inbox-items="filteredInboxItems"
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { breakpointsTailwind } from '@vueuse/core'
import type { InboxItem } from '@/common/types'

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
})

const tabItems = [
  {
    label: 'All',
    value: 'all'
  },
  {
    label: 'Unread',
    value: 'unread'
  }
]
const selectedTab = ref('all')

const { data: messages } = await useFetch<InboxItem[]>('/api/inbox', { default: () => [] })

// Filter messages based on the selected tab
const filteredInboxItems = computed<any[]>(() => {
  if (selectedTab.value === 'unread') {
    return messages.value.filter(message => !message.isRead)
  }

  return messages.value
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

// Reset selected message if it's not in the filtered messages
watch(filteredInboxItems, () => {
  if (!filteredInboxItems.value.find(message => message.id === selectedInboxItem.value?.id)) {
    selectedInboxItem.value = null
  }
})

watch(selectedInboxItem, () => {
  const index = filteredInboxItems.value.findIndex(message => message.id === selectedInboxItem.value?.id)
  if (index !== -1) {
    filteredInboxItems.value[index] = selectedInboxItem.value
  }
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')
</script>
