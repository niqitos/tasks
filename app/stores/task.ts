export const useTaskStore = defineStore('task', () => {
  const task = ref<any>(null)

  return {
    task
  }
})
