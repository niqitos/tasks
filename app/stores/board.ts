export const useBoardStore = defineStore('board', () => {
  const boards = ref<any[]>([])

  return {
    boards
  }
})
