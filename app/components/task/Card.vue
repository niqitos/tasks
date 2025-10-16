<template>
  <UCard
    class="mb-4"
    draggable="true"
    :ui="{
      body: 'p-3 sm:p-3'
    }"
    @click="show(task.id)"
  >
    <div>
      <strong v-text="name" />

      <!-- <p
        v-text="description"
        class="text-muted text-sm"
      /> -->
    </div>

    <UAvatarGroup
      v-if="task.assignees.length"
      :ui="{
        root: 'flex flex-row justify-end-safe mt-2'
      }"
    >
      <!-- <UTooltip
        v-for="assignee in task.assignees"
        :key="assignee.id"
        :delay-duration="0"
        text="Open on GitHub"
      >
        <UAvatar
          :src="assignee.user.avatar"
          :alt="`${assignee.user.name}${assignee.user.lastname ? ` ${assignee.user.lastname}` : ''}`"
        />
      </UTooltip> -->
      <TaskCardAssignee
        v-for="assignee in task.assignees"
        :key="assignee.user.id"
        :user="assignee.user"
      />
    </UAvatarGroup>
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  task: {
    required: true,
    type: Object
  }
})

const router = useRouter()
const localePath = useLocalePath()

const show = (id: string) => {
  router.push(localePath({ name: 'index-tasks-id', params: { id } }))
}

const name = computed(() => props.task.name.length > 90
  ? props.task.name.slice(0, 90) + '…'
  : props.task.name
)

const description = computed(() => {
  if (!props.task.description) return ''

  const div = document.createElement('div')
  div.innerHTML = props.task.description.trim()

  const firstEl = div.firstElementChild
  if (!firstEl) return ''

  const text = firstEl.textContent?.trim() || ''

  return text.length > 160
    ? text.slice(0, 160) + '…'
    : text
})
</script>
