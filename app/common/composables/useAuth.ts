export const useAuth = () => {
  const localePath = useLocalePath()
  const jwtCookie = useCookie('TasksJWT')

  const logout = async () => {
    jwtCookie.value = null

    const fcmToken = localStorage.getItem('fcmToken')

    if (fcmToken) {
      await useFetch<any>(`/api/fcm/token/${fcmToken}`, {
        method: 'DELETE'
      })

      localStorage.removeItem('fcmToken')
    }

    return navigateTo(localePath('login'), { external: true })
  }

  return {
    logout
  }
}
