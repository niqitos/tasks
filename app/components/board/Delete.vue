<template>
  <UModal
    v-model:open="open"
    :title="$t('board.delete.title')"
    :description="$t('board.delete.description')"
    :ui="{
      footer: 'justify-end gap-2'
    }"
  >
    <UButton
      icon="i-lucide:trash"
      color="error"
      variant="link"
      :title="$t('board.delete.button')"
      :ui="{
        base: 'p-0',
        leadingIcon: 'size-4'
      }"
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
        :label="$t('board.delete.submit')"
        :loading
        @click="remove()"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = defineProps({
  board: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()

const toast = useToast()

const workspaceStore = useWorkspaceStore()

const open = ref<boolean>(false)
const loading = ref<boolean>(false)

const remove = async () => {

  try {
    await $fetch(`/api/boards/${props.board.id}`, {
      method: 'DELETE'
    })

    const index = workspaceStore.current.boards.findIndex((b: any) => b.id === props.board.id)

    if (index !== -1) {
      workspaceStore.current.boards.splice(index, 1)
    }

    open.value = false

    toast.add({
      title: t('success.title'),
      description: t('board.delete.success.description'),
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
</script>
