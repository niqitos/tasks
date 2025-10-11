<template>
  <UModal
    v-model:open="open"
    :title="$t('task.delete.title')"
    :description="$t('task.delete.description')"
    :ui="{
      footer: 'justify-end gap-2'
    }"
  >
    <UButton
      icon="i-lucide:trash"
      color="error"
      variant="outline"
      :label="$t('task.delete.button')"
      @click="open = true"
    />

    <template #footer="{ close }">
      <UButton
        color="neutral"
        variant="outline"
        :label="$t('cancel')"
        @click="close"
      />

      <UButton
        color="error"
        :label="$t('task.delete.submit')"
        :loading
        @click="remove()"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()
const router = useRouter()
const toast = useToast()

const workspaceStore = useWorkspaceStore()

const open = ref<boolean>(false)
const loading = ref<boolean>(false)
const board = ref<any>(workspaceStore.current.boards.find((b: any) => b.id === props.task.boardId))

const remove = async () => {
  try {
    await $fetch(`/api/tasks/${props.task.id}`, {
      method: 'DELETE'
    })

    if (board.value) {
      const index = board.value.tasks.findIndex((b: any) => b.id === props.task.id)

      if (index !== -1) {
        board.value.tasks.splice(index, 1)
      }
    }

    open.value = false

    toast.add({
      title: t('success.title'),
      description: t('task.delete.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    loading.value = false

    router.push('/')
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
</script>
