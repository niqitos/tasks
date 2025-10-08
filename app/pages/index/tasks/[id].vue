<template>
  <UForm
    v-if="task"
    @submit="onSubmit"
  >
    <UFormField
      :label="$t('task.name')"
      class="w-full mb-4"
    >
      <UInput
        v-model="task.name"
        :ui="{
          root: 'w-full'
        }"
      />
    </UFormField>

    <UFormField
      :label="$t('task.description')"
      class="w-full mb-4"
    >
      <UTextarea
        v-model="task.description"
        autoresize
        :ui="{
          root: 'w-full'
        }"
      />
    </UFormField>

    <div class="flex justify-between">
      <!-- <UButton
        :label="$t('task.delete')"
        icon="i-lucide:trash"
        color="error"
        @click="deleteTask"
      /> -->

      <UButton
        :label="$t('task.update.button')"
        icon="i-lucide:save"
        color="success"
        type="submit"
        :loading="loading"
      />
    </div>
  </UForm>

  <template v-else>
    <p v-text="$t('task.404')" />
  </template>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

// const boardStore = useBoardStore()
const workspaceStore = useBoardStore()

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { t } = useI18n()

const loading = ref<boolean>(false)

const task = ref(workspaceStore.workspaces.flatMap(w => w.boards).flatMap(b => b.tasks).find(t => t.id === route.params.id))

const deleteTask = async () => {
  // toast.add({
  //   title: t('task.delete'),
  //   description: `${task.value?.name} has been deleted.`,
  //   icon: 'i-lucide:trash',
  //   color: 'error'
  // })
  // boardStore.deleteTask(route.params.id)
  // router.push('/')
}

const onSubmit = async () => {
  loading.value = true

  try {
    const response = await $fetch(`/api/tasks/${route.params.id}`, {
      method: 'PATCH',
      body: task.value
    })

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
</script>
