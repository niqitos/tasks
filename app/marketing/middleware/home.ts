export default defineNuxtRouteMiddleware(async (to) => {
  const localePath = useLocalePath()
  const token = useCookie('TasksJWT')
  const userStore = useUserStore()

  if (!token.value) {
    return
  }

  try {
    const verified = await $fetch('/api/auth/verify', {
      method: 'POST',
      body: {
        token: token.value
      }
    })

    if (!verified.valid) {
      token.value = null

      return
    }

    const user = await $fetch('/api/auth/user')

    userStore.user = user

    return navigateTo(localePath('dashboard'))
  } catch (err) {
    token.value = null

    return
  }
})
