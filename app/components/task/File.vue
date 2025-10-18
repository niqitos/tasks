<template>
  <div class="inline-flex items-center mr-4 relative group">
    <ULink
      :to="`/api/tasks/${task.id}/files/${file?.id}`"
      target="_blank"
      class="mt-2 inline-flex items-center"
    >
      <img
        v-if="file?.mimeType && file.mimeType.startsWith('image/')"
        :src="`/api/tasks/${task.id}/files/${file?.id}`"
        :alt="file?.filename"
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

    <UButton
      color="neutral"
      variant="link"
      size="xs"
      icon="i-lucide:x"
      :ui="{
        base: 'absolute -right-5 top-[calc(50%-.25rem)] p-0 opacity-0 group-hover:opacity-100 transition-opacity'
      }"
      @click="remove"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})

const config = useRuntimeConfig()
const supabase = useSupabase()
const toast = useToast()
const { t } = useI18n()

const workspaceStore = useWorkspaceStore()

const task = defineModel<any>('task')

const remove = async () => {
  try {
    const { data, error } = await supabase
      .storage
      .from(config.public.supabaseBucket)
      .remove([
        `tasks/${task.value?.id}/${props.file.filename}`
      ])

    // console.log({ data, error })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: t('error.500'),
        fatal: true
      })
    }

    await $fetch(`/api/tasks/${task.value.id}/files/${props.file.id}`, {
      method: 'DELETE'
    })

    const taskFileIndex = task.value.files.findIndex((file: any) => file.id === props.file.id)

    if (taskFileIndex !== -1) {
      task.value.files.splice(taskFileIndex, 1);
    }

    const workspaceBoardTaskFiles = workspaceStore.current
      .boards
      .find((b: any) => b.id === task.value.boardId)
      .tasks
      .find((t: any) => t.id === task.value.id)
      .files

    const workspaceBoardTaskFileIndex = workspaceBoardTaskFiles.findIndex((file: any) => file.id === props.file.id)

    if (workspaceBoardTaskFileIndex !== -1) {
      workspaceBoardTaskFiles.splice(workspaceBoardTaskFileIndex, 1);
    }

    toast.add({
      title: t('success.title'),
      description: t('task.files.delete.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })
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

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>
