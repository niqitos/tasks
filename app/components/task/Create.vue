<template>
  <UTextarea
    v-if="roleStore.canCreateTasks"
    v-model="name"
    size="lg"
    :rows="1"
    autoresize
    :placeholder="$t('task.create.placeholder')"
    icon="i-lucide:plus"
    :loading
    :ui="{
      root: 'w-full'
    }"
    @keyup.enter="store"
  />

  <UButton
    v-else
    :label="$t(`plans.${userStore.user.plan}.upgrade`)"
    icon="i-lucide:circle-fading-arrow-up"
    color="primary"
    :to="localePath('upgrade')"
    :ui="{
      base: 'w-full flex justify-center items-center'
    }"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  board: {
    type: Object,
    required: true
  }
})

const userStore = useUserStore()
const roleStore = useRoleStore()

const localePath = useLocalePath()
const toast = useToast()
const { t } = useI18n()

const name = ref('')
const loading = ref<boolean>(false)

const store = async (e: Event) => {
  loading.value = true

  try {
    const task = await $fetch('/api/tasks', {
      method: 'POST',
      body: {
        name: name.value,
        description: '',
        position: props.board.tasks.length + 1,
        boardId: props.board.id,
        creatorId: userStore.user.id
      }
    })

    props.board.tasks.push(task)

    name.value = ''

    toast.add({
      title: t('success.title'),
      description: t('task.create.success.description'),
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
