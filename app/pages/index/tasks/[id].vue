<template>
  <UModal
    v-model:open="open"
    :title="$t('task.edit')"
    :ui="{
      content: 'min-w-80 sm:min-w-120 md:min-w-160 lg:min-w-200'
    }"
    @update:open="close"
  >
    <template #body>
      <div class="flex items-center gap-2 mb-4">
        <span v-text="$t('task.createdBy')" />

        <UAvatar
          :src="task?.creator.avatar || ''"
          :alt="fullName"
          :icon="fullName ? '' : 'i-lucide:user'"
        />

        <span v-text="fullName" />
      </div>

      <UForm
        v-if="task"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField
          :label="$t('task.name.label')"
          class="w-full"
          name="name"
          required
        >
          <UTextarea
            v-model="state.name"
            :rows="1"
            autoresize
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <UFormField
          :label="$t('task.description.label')"
          class="w-full"
          name="description"
        >
          <!-- <UTextarea
            v-model="state.description"
            autoresize
            :ui="{
              root: 'w-full'
            }"
          /> -->
          <ClientOnly>
            <TiptapEditor
              :content="state.description"
              @change="($event: any) => {
                state.description = $event
              }"
            />
          </ClientOnly>
        </UFormField>

        <div class="flex justify-between">
          <TaskDelete
            :task="task"
          />

          <UButton
            :label="$t('task.update.button')"
            icon="i-lucide:save"
            type="submit"
            :loading="loading"
          />
        </div>
      </UForm>

      <template v-else>
        <p v-text="$t('task.404')" />
      </template>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: ['auth']
})

const localePath = useLocalePath()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const task = await $fetch(`/api/tasks/${route.params.id}`)

const schema = z.object({
  name: z.string(t('task.name.required')).min(1, t('task.name.required')),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: task?.name,
  description: task?.description || ''
})

const boardStore = useBoardStore()

const board = computed(() => boardStore.boards.find((b: any) => b.id === task?.boardId))

const loading = ref<boolean>(false)

const fullName = computed(() => `${task?.creator.name}${task?.creator.lastname ? ` ${task?.creator.lastname}` : ''}`)

const open = computed<boolean>(() => route.path === localePath('index-tasks-id') && !!task)

const submit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true

  try {
    await $fetch(`/api/tasks/${route.params.id}`, {
      method: 'PATCH',
      body: event.data
    })

    if (board.value) {
      const index = board.value.tasks.findIndex((b: any) => b.id === route.params.id)

      if (index !== -1) {
        board.value.tasks[index] = { ...board.value.tasks[index], ...event.data }
      }
    }

    toast.add({
      title: t('success.title'),
      description: t('task.update.success'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    loading.value = false
  } catch (error: any) {
    loading.value = false

    toast.add({
      title: t('error.title'),
      description: t('error.500'),
      icon: 'i-lucide:circle-check',
      color: 'error',
      duration: 3000
    })
  }
}

const close = () => {
  navigateTo(localePath('/'))
}
</script>
