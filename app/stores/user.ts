export const useUserStore = defineStore('user', () => {
  const user = ref<any>({})

  const edit = ref<boolean>(false)

  return {
    user,
    edit
  }
})
