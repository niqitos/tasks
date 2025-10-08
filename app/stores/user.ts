export const useUserStore = defineStore('user', () => {
  const user = ref<any>({})

  return {
    user
  }
})
