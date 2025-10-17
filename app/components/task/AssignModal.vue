<template>
  <UModal
    v-model:open="open"
  >
    <UButton
      :label="$t('task.assign.button')"
      color="neutral"
      variant="outline"
      icon="i-lucide:plus"
    />

    <template #content>
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
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const workspaceStore = useWorkspaceStore()

const open = ref<boolean>(false)
const searchTerm = ref<string>('')

const { data: users, status } = await useFetch(`/api/users/${workspaceStore.current.id}`, {
  key: `/api/users/${workspaceStore.current.id}`,
  params: { q: searchTerm },
  transform: (data: any[]) => {
      return data?.map(user => ({
          id: user.id,
          label: `${user.name}${user.lastname ? ` ${user.lastname}` : ''}`,
          suffix: user.email,
          avatar: {
            src: user.avatar,
            alt: `${user.name}${user.lastname ? ` ${user.lastname}` : ''}`
          }
        })
    ) || []
  },
  lazy: true
})

const assign = async (user: any) => {
  const response = await $fetch(`/api/tasks/${props.task.id}/${user.id}`, {
    method: 'POST'
  })

  props.task.assignees.push(response)

  workspaceStore.current
    .boards
    .find((b: any) => b.id === props.task.boardId)
    .tasks
    .find((t: any) => t.id === props.task.id)
    .assignees
    .push(response)

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
