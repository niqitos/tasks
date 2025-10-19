export const useWorkspaceStore = defineStore('workspace', () => {
  const workspaces = ref<any[]>([])
  const current = ref<any>(null)

  return {
    workspaces,
    current
  }
})
