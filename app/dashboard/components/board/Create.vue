<template>
  <UCard
    :ui="{
      root: 'flex-1 rounded bg-elevated min-w-80',
      body: 'p-3 sm:p-3'
    }"
  >
    <UTextarea
      v-if="roleStore.canCreateBoards"
      v-model="name"
      :rows="1"
      autoresize
      :placeholder="$t('board.create.placeholder')"
      icon="i-lucide:plus"
      :loading
      :ui="{
        root: 'w-full',
        leading: 'py-0.5'
      }"
      @keyup.enter="store"
    />

    <UpgradeButton v-else />
  </UCard>
</template>

<script lang="ts" setup>
const props = defineProps({
  workspace: {
    type: Object,
    required: true
  }
})

const localePath = useLocalePath()
const { t } = useI18n()
const toast = useToast()

const roleStore = useRoleStore()
const userStore = useUserStore()

const name = ref<string>('')
const loading = ref<boolean>(false)

const store = async () => {
  loading.value = true

  try {
    const task = await $fetch('/api/boards', {
      method: 'POST',
      body: {
        name: name.value,
        description: '',
        position: props.workspace.boards.length + 1,
        workspaceId: props.workspace.id,
        creatorId: userStore.user.id
      }
    })

    props.workspace.boards.push(task)

    name.value = ''

    toast.add({
      title: t('success.title'),
      description: t('board.create.success.description'),
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
