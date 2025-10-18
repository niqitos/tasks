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

  const canAddMembersToWorkspace = computed<boolean>(() =>
    planStore.limitations[userStore.user?.plan]?.workspaces.members.max === planStore.unlimited ||
    planStore.limitations[userStore.user?.plan]?.workspaces.members.max > workspaceStore.current?.members.length
  )

  const canAddFilesToTask: boolean = (task: any) =>
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.tasks.files.max === planStore.unlimited ||
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.tasks.files.max > task.files.length

  const canAddAssigneesToTask: boolean = (task: any) =>
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.tasks.assignees.max === planStore.unlimited ||
    planStore.limitations[userStore.user?.plan]?.workspaces.boards.tasks.assignees.max > task.assignees.length

  return {
    roles,
    canCreateWorkspaces,
    canCreateBoards,
    canCreateTasks,
    canAddMembersToWorkspace,
    canAddFilesToTask,
    canAddAssigneesToTask
  }
})
