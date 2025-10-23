export default defineNuxtRouteMiddleware(async (to) : Promise<any> => {
  const localePath = useLocalePath()

  const roleStore = useRoleStore()
  const workspaceStore = useWorkspaceStore()
  const boardStore = useBoardStore()

  workspaceStore.setWorkspaces()

  if (roleStore.canViewCalendar) {
    return
  }

  return navigateTo(localePath('dashboard'))
})
