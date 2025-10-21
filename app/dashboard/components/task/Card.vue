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

    <div
      v-show="task.files.length || task.assignees.length"
      class="flex items-center justify-between mt-2"
    >
      <div
        v-if="task.files.length || task.comments.length"
        class="flex gap-2"
      >
        <UTooltip
          v-if="task.files.length"
          :delay-duration="0"
          :text="$t('task.files.attached')"
        >
          <UIcon
            name="i-lucide:paperclip"
            class="text-dimmed"
          />
        </UTooltip>

        <UTooltip
          v-if="task.comments.length"
          :delay-duration="0"
          :text="$t('task.comments.has')"
        >
          <UIcon
            name="i-lucide:message-square-text"
            class="text-dimmed"
          />
        </UTooltip>
      </div>

      <UAvatarGroup
        v-show="task.assignees.length"
        :ui="{
          root: 'flex flex-row flex-1 justify-end-safe'
        }"
      >
        <TaskCardAssignee
          v-for="assignee in task.assignees"
          :key="assignee.user.id"
          :user="assignee.user"
        />
      </UAvatarGroup>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  task: {
    required: true,
    type: Object
  }
})

const localePath = useLocalePath()

const show = (task: string) => {
  return navigateTo(localePath({ name: 'dashboard-index-tasks-task', params: { task } }))
}

const name = computed(() => props.task.name.length > 90 ? props.task.name.slice(0, 90) + '…' : props.task.name)

// const description = computed(() => {
//   if (!props.task.description) return ''

//   const div = document.createElement('div')
//   div.innerHTML = props.task.description.trim()

//   const firstEl = div.firstElementChild

//   if (!firstEl) {
//     return ''
//   }

//   const text = firstEl.textContent?.trim() || ''

//   return text.length > 160 ? text.slice(0, 160) + '…' : text
// })
</script>
