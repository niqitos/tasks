<script setup lang="ts">
const boardStore = useBoardStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const { t } = useI18n()

const task = boardStore.getTask(route.params.id)

const deleteTask = () => {
  toast.add({
    title: t('task.delete'),
    description: `${task?.name} has been deleted.`,
    icon: 'i-lucide:trash',
    color: 'error'
  })
  boardStore.deleteTask(route.params.id)
  router.push('/')
}

const onSubmit = () => {

}
</script>

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
        :ui="{
          root: 'w-full'
        }"
      />
    </UFormField>

    <div class="flex justify-between">
      <UButton
        :label="$t('task.delete')"
        icon="i-lucide:trash"
        color="error"
        @click="deleteTask"
      />
    </div>
  </UForm>

  <template v-else>
    <p v-text="$t('task.404')" />
  </template>
</template>
