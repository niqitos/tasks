export const useWorkspaceStore = defineStore('workspace', () => {
  const workspaces = ref<any[]>([])
  const current = ref<any>(null)

  const tempBackground = ref<string>()

  const background = computed<string>(() => {
    if (tempBackground.value) {
      return tempBackground.value
    } else if (current.value && current.value.backgroundType === 'color') {
      return `bg-${current.value.background.color}-500/50`
    } else if (current.value && current.value.backgroundType === 'image' && current.value.background?.image) {
      return `url(${current.value.background.image})`
    }

    return ''
  })

  return {
    tempBackground,
    workspaces,
    current,
    background
  }
})
