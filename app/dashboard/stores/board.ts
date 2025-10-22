export const useBoardStore = defineStore('board', () => {
  const boards = ref<Board[]>([])

  return {
    boards
  }
})
