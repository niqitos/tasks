<template>
  <div class="overflow-y-auto divide-y divide-default">
    <div
      v-for="(inboxItem, index) in inboxItems"
      :key="index"
      :ref="el => { inboxItemsRefs[inboxItem.id] = el as Element }"
    >
      <div
        class="p-4 sm:px-6 text-sm cursor-pointer border-l-2 transition-colors"
        :class="[
          'flex gap-2',
          !inboxItem.isRead ? 'text-highlighted' : 'text-toned)',
          selectedInboxItem && selectedInboxItem.id === inboxItem.id ? 'border-primary bg-primary/10' : 'border-(--ui-bg) hover:border-primary hover:bg-primary/5'
        ]"
        @click="selectedInboxItem = inboxItem"
      >
        <div
          v-if="inboxItem.important"
          class="flex items-center"
        >
          <UIcon
            name="i-lucide:star"
            class="size-5 text-warning"
          />
        </div>

        <div class="flex-1">
          <div
            :class="[
              'flex items-center justify-between',
              !inboxItem.isRead ? 'font-semibold' : 'text-muted'
            ]"
          >
            <div class="flex items-center gap-3">
              {{ fullname(inboxItem.creator) }}

              <UChip v-if="!inboxItem.isRead" />
            </div>

            <span v-text="isToday(new Date(inboxItem.createdAt)) ? format(new Date(inboxItem.createdAt), 'HH:mm') : format(new Date(inboxItem.createdAt), 'dd MMM')" />
          </div>

          <p
            :class="[!inboxItem.isRead && 'font-semibold']"
            v-text="trimInboxItemTitle(inboxItem)"
          />

          <!-- <p
            class="text-dimmed line-clamp-1"
            v-text="inboxItem.body"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format, isToday } from 'date-fns'
const props = defineProps<{
  inboxItems: InboxItem[]
}>()

const { inboxItemTitle } = useInbox()

const inboxItemsRefs = ref<Element[]>([])

const selectedInboxItem = defineModel<InboxItem | null>({
  required: true
})

const fullname = (user: any) => `${user.name}${user.lastname ? ` ${user.lastname}` : ''}`

const trimInboxItemTitle = (value: InboxItem) => {
  const inboxItem = inboxItemTitle(value)

  return inboxItem.length > 90 ? inboxItem.slice(0, 90) + '…' : inboxItem
}

watch(selectedInboxItem, () => {
  if (!selectedInboxItem.value) {
    return
  }

  const ref = inboxItemsRefs.value[selectedInboxItem.value?.id]

  if (ref) {
    ref.scrollIntoView({ block: 'nearest' })
  }
})

defineShortcuts({
  arrowdown: () => {
    const index = props.inboxItems.findIndex(inboxItem => inboxItem.id === selectedInboxItem.value?.id)

    if (index === -1) {
      selectedInboxItem.value = props.inboxItems[0]
    } else if (index < props.inboxItems.length - 1) {
      selectedInboxItem.value = props.inboxItems[index + 1]
    }
  },
  arrowup: () => {
    const index = props.inboxItems.findIndex(inboxItem => inboxItem.id === selectedInboxItem.value?.id)

    if (index === -1) {
      selectedInboxItem.value = props.inboxItems[props.inboxItems.length - 1]
    } else if (index > 0) {
      selectedInboxItem.value = props.inboxItems[index - 1]
    }
  }
})
</script>
