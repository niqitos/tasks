export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('TasksJWT')

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

    if (verified.valid) {
      return navigateTo('/')
    }
  } catch (err) {
    token.value = null

    return
  }

  return
})
