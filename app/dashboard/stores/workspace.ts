export const useWorkspaceStore = defineStore('workspace', () => {
  const boardStore = useBoardStore()

  const workspaces = ref<Workspace[]>([])
  const current = ref<Workspace>()

  const tempBackground = ref<string>()

  const background = computed<string>(() => {
    if (tempBackground.value) {
      return tempBackground.value
    } else if (current.value && current.value.backgroundType === 'color') {
      return `bg-${current.value.background.color}-300 dark:bg-${current.value.background.color}-950`
    } else if (current.value && current.value.backgroundType === 'image' && current.value.background?.image) {
      return `url(${current.value.background.image})`
    }

    return ''
  })

  const setWorkspaces = async () : Promise<any> => {
    workspaces.value = await $fetch<Workspace[]>('/api/workspaces') || []

    if (workspaces.value.length > 0) {
      let workspace = workspaces.value.find((w: any) => w.id === localStorage.getItem('workspace.current.id'))

      if (!workspace && workspaces.value.length > 0 && workspaces.value[0]) {
        workspace = workspaces.value[0]

        localStorage.setItem('workspace.current.id', workspace.id)
      }

      current.value = workspace

      boardStore.boards = current.value?.boards || []
    }
  }

  return {
    tempBackground,
    workspaces,
    current,
    background,
    setWorkspaces
  }
})
