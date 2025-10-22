<template>
  <UModal
    v-model:open="open"
    :title="$t('workspaces.members.remove.title')"
    :description="$t('workspaces.members.remove.description')"
    :ui="{
      footer: 'justify-end gap-2'
    }"
  >
    <UButton
      color="neutral"
      variant="link"
      icon="i-lucide:x"
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
        :label="$t('workspaces.members.remove.submit')"
        :loading
        @click="remove()"
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const props = defineProps({
  member: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()
const router = useRouter()
const toast = useToast()
const localePath = useLocalePath()

const workspaceStore = useWorkspaceStore()

const open = ref<boolean>(false)
const loading = ref<boolean>(false)
// const board = ref<any>(workspaceStore.current.boards.find((b: any) => b.id === props.task.boardId))

const remove = async () : Promise<any> => {
  try {
    await $fetch(`/api/workspaces/${workspaceStore.current?.id}/members/${props.member.id}`, {
      method: 'DELETE'
    })

    if (workspaceStore.current) {
      const index = workspaceStore.current.members.findIndex((b: any) => b.id === props.member.id)

      if (index !== -1) {
        workspaceStore.current.members.splice(index, 1)
      }
    }

    open.value = false

    toast.add({
      title: t('success.title'),
      description: t('workspaces.members.remove.success.description'),
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
