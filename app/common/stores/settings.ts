export const useSettingsStore = defineStore('settings', () => {
  const edit = ref<boolean>(false)

  return {
    edit
  }
})
