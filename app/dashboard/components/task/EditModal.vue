<template>
  <UModal
    v-model:open="open"
    :title="$t('task.edit')"
    :ui="{
      header: 'flex justify-between items-center',
      body: 'min-h-fit overflow-clip',
      content: 'min-w-full sm:min-w-[calc(100%-3rem)] lg:min-w-240 max-h-dvh overflow-auto rounded-none sm:rounded-lg',
      footer: 'p-0 sm:p-0'
    }"
    @update:open="close"
  >
    <template #header>
      <h2
        class="text-highlighted font-semibold flex justify-between items-center"
        v-text="$t('task.edit')"
      />

      <div class="flex gap-2">
        <LocalToast ref="toastRef" />

        <TaskDelete
          :task="task"
        />

        <UButton
          icon="i-lucide:x"
          color="neutral"
          variant="link"
          @click="open = false;close()"
        />
      </div>
    </template>

    <template #body>
      <template v-if="task">
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
              @update:model-value="debouncedFn()"
            />
          </UFormField>

          <ClientOnly>
            <TiptapEditor
              :content="state.description ?? ''"
              @change="($event: any) => {
                if (state.description === $event) return
                debouncedFn()
                state.description = $event
              }"
            />
          </ClientOnly>

          <UFileUpload
            v-if="roleStore.canAddFilesToTask(task)"
            v-model="files"
            :label="$t('task.files.create.label')"
            :description="`SVG, PNG, JPG, GIF, WEBP, DOC, EXCEL ${$t('or')} PDF (${$t('task.files.create.max')} 2${$t('mb')})`"
            accept=".svg,.png,.jpg,.jpeg,.gif,.webp,.doc,.docx,.xlsx,.pdf"
            multiple
            class="w-full min-h-16 mt-4"
            :ui="{
              base: 'p-0'
            }"
            @update:model-value="uploadFiles"
          />

          <UpgradeButton v-else />

          <UFormField
            v-if="task.files.length"
            :label="$t('task.files.label')"
          >
            <TaskFile
              v-for="(file, index) in task.files"
              :key="index"
              v-model:task="task"
              :file
            />
          </UFormField>

          <TaskStartEndDates
            v-model:task="task"
            @updated="debouncedFn()"
          />

          <TaskComplete
            v-model:completedAt="task.completedAt"
            @updated="debouncedFn()"
          />

          <UFormField
            :label="$t('task.assignees', task.assignees.length)"
          >
            <div class="flex gap-4">
              <TaskAssignee
                v-for="assignee in task.assignees"
                v-model:task="task"
                :assignee
              />

              <TaskAssignModal
                :task="task"
              />
            </div>
          </UFormField>
        </UForm>
      </template>

      <template v-else>
        <p v-text="$t('task.404')" />
      </template>
    </template>

    <template
      v-if="task"
      #footer
    >
      <TaskComments
        :task
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import * as z from 'zod'

const props = defineProps({
  toPath: {
    type: String,
    required: true
  },
  closePath: {
    type: String,
    required: true
  }
})

const config = useRuntimeConfig()
const supabase = useSupabase()
const route = useRoute()
const toast = useToast()
const { t } = useI18n()

const roleStore = useRoleStore()

const task = ref<any>(await $fetch(`/api/tasks/${route.params.task}`))

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

const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

const loading = ref<boolean>(false)
const toastRef = ref<any>(null)

const board = computed(() => boardStore.boards.find((b: any) => b.id === task.value?.boardId))

const open = computed<boolean>(() => route.path === props.toPath && !!task)

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

const submit = async () => {
  loading.value = true

  try {
    await $fetch(`/api/tasks/${route.params.task}`, {
      method: 'PATCH',
      body: {
        ...state,
        startAt: task.value?.startAt,
        endAt: task.value?.endAt,
        completedAt: task.value?.completedAt
      }
    })

    if (board.value) {
      const index = board.value.tasks.findIndex((b: any) => b.id === route.params.task)

      if (index !== -1) {
        boardStore.boards.find((b: any) => b.id === task.value?.boardId).tasks[index] = task.value
      }
    }

    // toast.add({
    //   title: t('success.title'),
    //   description: t('task.update.success'),
    //   icon: 'i-lucide:circle-check',
    //   color: 'success',
    //   duration: 3000
    // })
    toastRef.value?.showToast({
      title: t('task.update.success'),
      icon: 'i-lucide:circle-check',
      color: 'success',
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

const debouncedFn = useDebounceFn(async () => {
  await submit()
}, 1000)

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

      // console.log({ data, error })

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
          url: `${config.public.supabaseUrl}/storage/v1/object/authenticated/${data?.fullPath}`,
          mimeType: f.type,
          size: f.size
        }
      })

      task.value?.files.push(file)

      workspaceStore.current
        .boards
        .find((b: any) => b.id === task.value.boardId)
        .tasks
        .find((t: any) => t.id === task.value.id)
        .files
        .push(file)
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
  navigateTo(props.closePath)
}
</script>
