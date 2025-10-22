export const useRoleStore = defineStore('role', () => {
  const { $i18n } = useNuxtApp()

  const planStore = usePlanStore()
  const workspaceStore = useWorkspaceStore()

  const roles = ref<any>([
    {
      value: 'guest',
      label: $i18n.t('role.guest.label')
    },
    {
      value: 'maintainer',
      label: $i18n.t('role.maintainer.label')
    },
    {
      value: 'admin',
      label: $i18n.t('role.admin.label')
    }
  ])

  const limitations = computed<any>(() => planStore.limitations[workspaceStore.current?.creator.plan/*userStore.user?.plan*/ || 'free'])

  const canCreateWorkspaces = computed<boolean>(() =>
    limitations.value?.workspaces.max === planStore.unlimited ||
    limitations.value?.workspaces.max > workspaceStore.workspaces.length
  )

  const canCreateBoards = computed<boolean>(() =>
    limitations.value?.workspaces.boards.max === planStore.unlimited ||
    limitations.value?.workspaces.boards.max > (workspaceStore.current?.boards?.length ?? 0)
  )

  const canCreateTasks = computed<boolean>(() =>
    limitations.value?.workspaces.boards.tasks.max === planStore.unlimited ||
    limitations.value?.workspaces.boards.tasks.max > (workspaceStore.current?.boards ?? []).map((b: any) => b.tasks).flat().length
  )

  const canAddMembersToWorkspace = computed<boolean>(() =>
    limitations.value?.workspaces.members.max === planStore.unlimited ||
    limitations.value?.workspaces.members.max > (workspaceStore.current?.members ?? []).length
  )

  const canViewBoards = computed<boolean>(() => limitations.value?.view.boards)

  const canViewCalendar = computed<boolean>(() => limitations.value?.view.calendar)

  const hasSupport = computed<boolean>(() => limitations.value?.support)

  const canAddFilesToTask = (task: any): boolean =>
    limitations.value?.workspaces.boards.tasks.files.max === planStore.unlimited ||
    limitations.value?.workspaces.boards.tasks.files.max > task.files.length

  const canAddAssigneesToTask = (task: any): boolean =>
    limitations.value?.workspaces.boards.tasks.assignees.max === planStore.unlimited ||
    limitations.value?.workspaces.boards.tasks.assignees.max > task.assignees.length

  return {
    roles,
    canCreateWorkspaces,
    canCreateBoards,
    canCreateTasks,
    canAddMembersToWorkspace,
    canViewBoards,
    canViewCalendar,
    hasSupport,
    canAddFilesToTask,
    canAddAssigneesToTask
  }
})
