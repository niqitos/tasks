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
const props = defineProps({
  assignee: {
    type: Object,
    required: true
  }
})

const workspaceStore = useWorkspaceStore()

const task = defineModel<any>('task')

const fullName = computed(() => `${props.assignee.user.name}${props.assignee.user.lastname ? ` ${props.assignee.user.lastname}` : ''}`)

const unassign = async () => {
  await $fetch(`/api/tasks/${task.value.id}/${props.assignee.id}`, {
    method: 'DELETE'
  })

  const taskAssigneeIndex = task.value.assignees.findIndex((assignee: any) => assignee.userId === props.assignee.user.id)

  if (taskAssigneeIndex !== -1) {
    task.value.assignees.splice(taskAssigneeIndex, 1);
  }

  const workspaceBoardTaskAssignees = workspaceStore.current
    .boards
    .find((b: any) => b.id === task.value.boardId)
    .tasks
    .find((t: any) => t.id === task.value.id)
    .assignees

  const workspaceBoardTaskAssigneeIndex = workspaceBoardTaskAssignees.findIndex((assignee: any) => assignee.userId === props.assignee.user.id)

  if (workspaceBoardTaskAssigneeIndex !== -1) {
    workspaceBoardTaskAssignees.splice(workspaceBoardTaskAssigneeIndex, 1);
  }
}
</script>
