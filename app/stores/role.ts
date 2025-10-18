export const useRoleStore = defineStore('role', () => {
  const { t } = useI18n()
  const userStore = useUserStore()
  const planStore = usePlanStore()
  const workspaceStore = useWorkspaceStore()

  const roles = ref<any>([
    {
      value: 'guest',
      label: t('role.guest.label')
    },
    {
      value: 'maintainer',
      label: t('role.maintainer.label')
    },
    {
      value: 'admin',
      label: t('role.admin.label')
    }
  ])

  const canCreateWorkspaces = computed<boolean>(() =>
    planStore.limitations[userStore.user?.plan]?.workspaces.max === planStore.unlimited ||
    planStore.limitations[userStore.user?.plan]?.workspaces.max > workspaceStore.workspaces.length
  )

  const canCreateBoards = computed<boolean>(() =>
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.max === planStore.unlimited ||
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.max > workspaceStore.current?.boards.length
  )

  const canCreateTasks = computed<boolean>(() =>
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.tasks.max === planStore.unlimited ||
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.tasks.max > workspaceStore.current?.boards.map((b: any) => b.tasks).flat().length
  )

  return {
    roles,
    canCreateWorkspaces,
    canCreateBoards,
    canCreateTasks
  }
})
