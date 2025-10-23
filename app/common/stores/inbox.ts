export const useInboxStore = defineStore('inbox', () => {
  const inboxes = ref<Inbox[]>([])
  const inboxItems = ref<InboxItem[]>([])

  return {
    inboxes,
    inboxItems
  }
})
