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

  const limitations = reactive<any>(planStore.limitations[workspaceStore.current?.creator.plan/*userStore.user?.plan*/])

  const canCreateWorkspaces = computed<boolean>(() =>
    limitations?.workspaces.max === planStore.unlimited ||
    limitations?.workspaces.max > workspaceStore.workspaces.length
  )

  const canCreateBoards = computed<boolean>(() =>
    limitations?.workspaces.boards.max === planStore.unlimited ||
    limitations?.workspaces.boards.max > workspaceStore.current?.boards.length
  )

  const canCreateTasks = computed<boolean>(() =>
    limitations?.workspaces.boards.tasks.max === planStore.unlimited ||
    limitations?.workspaces.boards.tasks.max > workspaceStore.current?.boards.map((b: any) => b.tasks).flat().length
  )

  const canAddMembersToWorkspace = computed<boolean>(() =>
    limitations?.workspaces.members.max === planStore.unlimited ||
    limitations?.workspaces.members.max > workspaceStore.current?.members.length
  )

  const canAddFilesToTask = (task: any): boolean =>
    limitations?.workspaces.boards.tasks.files.max === planStore.unlimited ||
    limitations?.workspaces.boards.tasks.files.max > task.files.length

  const canAddAssigneesToTask = (task: any): boolean =>
    limitations?.workspaces.boards.tasks.assignees.max === planStore.unlimited ||
    limitations?.workspaces.boards.tasks.assignees.max > task.assignees.length

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
