<template>
  <div class="flex items-center gap-2 relative group">
    <UAvatar
      :src="assignee.user.avatar || ''"
      :alt="fullName"
      :icon="fullName ? '' : 'i-lucide:user'"
    />

    <div class="text-xs">
      <div v-text="fullName" />
    </div>

    <UButton
      color="neutral"
      variant="link"
      size="xs"
      icon="i-lucide:x"
      :ui="{
        base: 'absolute -right-2 -top-1 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
      }"
      @click="unassign"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  assignee: TaskAssignee
}>()

const workspaceStore = useWorkspaceStore()

const task = defineModel<any>('task')

const fullName = computed(() => `${props.assignee.user.name}${props.assignee.user.lastname ? ` ${props.assignee.user.lastname}` : ''}`)

const unassign = async () : Promise<any> => {
  await $fetch(`/api/tasks/${task.value.id}/assignees/${props.assignee.id}`, {
    method: 'DELETE'
  })

  const taskAssigneeIndex = task.value.assignees.findIndex((assignee: TaskAssignee) => assignee.userId === props.assignee.user.id)

  if (taskAssigneeIndex !== -1) {
    task.value.assignees.splice(taskAssigneeIndex, 1);
  }

  const board = workspaceStore.current?.boards?.find((b: Board) => b.id === task.value.boardId)
  const boardTask = board?.tasks?.find((t: Task) => t.id === task.value.id)
  const workspaceBoardTaskAssignees = boardTask?.assignees ?? []

  const workspaceBoardTaskAssigneeIndex = workspaceBoardTaskAssignees.findIndex((assignee: TaskAssignee) => assignee.userId === props.assignee.user.id)

  if (workspaceBoardTaskAssigneeIndex !== -1 && boardTask) {
    // mutate only when the real assignees array exists on the found task
    boardTask.assignees?.splice(workspaceBoardTaskAssigneeIndex, 1);
  }
}
</script>
