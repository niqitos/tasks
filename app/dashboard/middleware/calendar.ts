export default defineNuxtRouteMiddleware(async (to) : Promise<any> => {
  const localePath = useLocalePath()

  const roleStore = useRoleStore()
  const workspaceStore = useWorkspaceStore()
  const boardStore = useBoardStore()

  const { data } = await useFetch<any>('/api/workspaces')

  if (data.value.length > 0) {
    workspaceStore.workspaces = data.value

    let workspace = workspaceStore.workspaces.find((w: any) => w.id === localStorage.getItem('workspace.current.id'))

    if (!workspace) {
      workspace = workspaceStore.workspaces[0]

      if (workspace && workspace.id != null) {
        localStorage.setItem('workspace.current.id', String(workspace.id))
      }
    }

    workspaceStore.current = workspace

    boardStore.boards = workspaceStore.current?.boards ?? []
  }

  if (roleStore.canViewCalendar) {
    return
  }

  return navigateTo(localePath('dashboard'))
})
