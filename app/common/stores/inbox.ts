export const useInboxStore = defineStore('inbox', () => {
  const inboxes = ref<Inbox[]>([])
  const inboxItems = ref<InboxItem[]>([])

  const inboxItemsRead = computed(() => inboxItems.value?.filter((i: InboxItem) => !i.isRead) || [])

  const getInbox = async () => {
    inboxItems.value = await $fetch<InboxItem[]>('/api/inbox', { default: () => [] })
  }

  return {
    inboxes,
    inboxItems,
    inboxItemsRead,
    getInbox
  }
})
