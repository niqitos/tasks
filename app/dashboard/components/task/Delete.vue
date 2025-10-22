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
      variant="link"
      :title="$t('task.delete.button')"
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

<script lang="ts" setup>
const props = defineProps<{
  task: Task
}>()

const { t } = useI18n()
const toast = useToast()
const localePath = useLocalePath()

const boardStore = useBoardStore()

const open = ref<boolean>(false)
const loading = ref<boolean>(false)

const remove = async () : Promise<any> => {
  try {
    await $fetch(`/api/tasks/${props.task.id}`, {
      method: 'DELETE'
    })

    const board = boardStore.boards.find((b: Board) => b.id === props.task.boardId)

    if (board) {
      const index = board.tasks.findIndex((t: Task) => t.id === props.task.id)

      if (index !== -1) {
        board.tasks.splice(index, 1)
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

    return navigateTo(localePath('dashboard'))
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
