<template>
  <UModal
    v-model:open="open"
  >
    <UButton
      v-if="roleStore.canAddAssigneesToTask(task)"
      v-bind="{
        [task.assignees.length ? 'title' : 'label']: $t('task.assign.button')
      }"
      color="neutral"
      variant="outline"
      icon="i-lucide:plus"
    />

    <UpgradeButton
      v-else
    />

    <template
      v-if="roleStore.canAddAssigneesToTask(task)"
      #content
    >
      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading="status === 'pending'"
        :groups="groups"
        :placeholder="$t('task.assign.search')"
        class="h-80"
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps<{
  task: Task
}>()

const roleStore = useRoleStore()
const workspaceStore = useWorkspaceStore()

const open = ref<boolean>(false)
const searchTerm = ref<string>('')

const { data: users, status } = await useFetch(`/api/workspaces/${workspaceStore.current?.id}/members`, {
  key: `/api/workspaces/${workspaceStore.current?.id}/members`,
  params: { q: searchTerm },
  transform: (data: any[]) => {
      return data?.map(member => ({
          id: member.user.id,
          label: `${member.user.name}${member.user.lastname ? ` ${member.user.lastname}` : ''}`,
          suffix: member.user.email,
          avatar: {
            src: member.user.avatar,
            alt: `${member.user.name}${member.user.lastname ? ` ${member.user.lastname}` : ''}`
          }
        })
    ) || []
  },
  lazy: true
})

const assign = async (user: any) : Promise<any> => {
  const response = await $fetch<TaskAssignee>(`/api/tasks/${props.task.id}/assignees`, {
    method: 'POST',
    body: {
      user: user.id
    }
  })

  props.task.assignees.push(response)

  // Safely update the workspace store only if the nested objects/arrays exist
  const current = workspaceStore.current
  if (current && Array.isArray(current.boards)) {
    const board = current.boards.find((b: any) => b.id === props.task.boardId)

    if (board && Array.isArray(board.tasks)) {
      const taskInStore = board.tasks.find((t: any) => t.id === props.task.id)

      if (taskInStore && Array.isArray(taskInStore.assignees)) {
        taskInStore.assignees.push(response)
      }
    }
  }

  open.value = false
}

const groups = computed(() => [{
  id: 'users',
  label: searchTerm.value ? `Users matching “${searchTerm.value}”...` : 'Users',
  items: users.value?.filter((user: any) => !props.task.assignees.map((assignee: any) => assignee.userId).includes(user.id)).map((u: any) => ({
    ...u,
    onSelect: (e: Event) => assign(u)
  })) || [],
  ignoreFilter: true
}])
</script>
