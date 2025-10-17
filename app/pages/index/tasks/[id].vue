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
      <div
        v-if="task?.creator"
        class="flex justify-between mb-4"
      >
        <TaskCreator
          :user="task.creator"
        />

        <div class="flex flex-col items-end text-xs">
          <div
            class="text-muted"
            v-text="$t('task.createdAt')"
          />

          <div
            v-text="createdAt"
          />
        </div>
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

          <UFileUpload
            v-model="files"
            :label="$t('task.files.add.label')"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            multiple
            class="w-full min-h-16 mt-4"
            :ui="{
              base: 'p-0'
            }"
            @update:model-value="uploadFiles"
          />

          <div v-if="task.files.length" class="mt-4">
            <h3 v-text="$t('task.files.label')" />

            <ULink
              v-for="(file, index) in task.files"
              :key="index"
              :to="file?.url"
              target="_blank"
              class="mt-2 flex items-center"
            >
              <NuxtImg
                v-if="file?.mimeType && file.mimeType.startsWith('image/')"
                :src="file?.url"
                alt="Preview"
                class="size-16 object-cover rounded"
              />

              <UIcon
                v-else
                name="i-lucide:paperclip"
                class="size-4"
              />

              <span
                class="ml-2"
                v-text="`${file.filename} (${formatBytes(file.size)})`"
              />
            </ULink>
          </div>
        </UFormField>

        <div>
          <div
            class="text-muted text-xs"
            v-text="$t('task.assignees', task.assignees.length)"
          />

          <div class="flex gap-4 mt-4">
            <TaskAssignee
              v-for="assignee in task.assignees"
              v-model:task="task"
              :assignee
            />

            <TaskAssignModal
              :task="task"
            />
          </div>
        </div>

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

const config = useRuntimeConfig()
const supabase = useSupabase()
const localePath = useLocalePath()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const task = ref(await $fetch(`/api/tasks/${route.params.id}`))

const files = ref<File[]>([])

const schema = z.object({
  name: z.string(t('task.name.required')).min(1, t('task.name.required')),
  description: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: task.value?.name,
  description: task.value?.description || ''
})

const boardStore = useBoardStore()

const board = computed(() => boardStore.boards.find((b: any) => b.id === task.value?.boardId))

const loading = ref<boolean>(false)

const open = computed<boolean>(() => route.path === localePath('index-tasks-id') && !!task)

const createdAt = computed(() => {
  const date = new Date(task.value?.createdAt)

  return date.toLocaleDateString([], {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
})

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

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const uploadFiles = async () => {
  try {
    if (!files.value.length) {
      return
    }

    files.value.forEach(async (f: any) => {
      const filename = `${Date.now()}-${f.name.toString().toLowerCase().trim().replace(/\s+/g, '_').replace(/[^\w.-]/g, '')}`

      const { data, error } = await supabase
        .storage
        .from(config.public.supabaseBucket)
        .upload(`tasks/${task.value?.id}/${filename}`, f)

      console.log({ data, error })

      if (error) {
        throw createError({
          statusCode: 500,
          statusMessage: t('error.500'),
          fatal: true
        })
      }

      const file = await $fetch(`/api/tasks/${task.value?.id}/files`, {
        method: 'POST',
        body: {
          filename,
          url: `${config.public.supabaseUrl}/storage/v1/object/public/${data?.fullPath}`,
          mimeType: f.type,
          size: f.size
        }
      })

      task.value?.files.push(file)
    })

    files.value = []
  } catch (error) {
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
  navigateTo(localePath('index'))
}
</script>
