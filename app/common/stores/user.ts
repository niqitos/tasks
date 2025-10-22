export const useUserStore = defineStore('user', () => {
  const user = ref<User>()

  const fullname = computed<string>(() => `${user.value?.name}${user.value?.lastname ? ` ${user.value.lastname}` : ''}`)

  const edit = ref<boolean>(false)

  return {
    user,
    fullname,
    edit
  }
})
