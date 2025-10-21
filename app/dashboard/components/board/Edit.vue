<template>
  <UModal
    v-model:open="open"
    :title="$t('board.update.title')"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField
          :label="$t('board.name.label')"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            :placeholder="$t('board.name.placeholder')"
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <UFormField
          :label="$t('board.description.label')"
          name="description"
        >
          <UTextarea
            v-model="state.description"
            :placeholder="$t('board.description.placeholder')"
            autoresize
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <FieldColorSelect
          v-model="state.color"
        />

        <UButton
          trailing-icon="i-lucide:arrow-right"
          :label="$t('board.update.title')"
          type="submit"
          :loading="loading"
          size="xl"
          :ui="{
            base: 'w-full mt-6 text-sm font-bold flex justify-center items-center cursor-pointer',
            trailingIcon: 'size-5'
          }"
        />
      </UForm>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps({
  board: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()
const toast = useToast()

const workspaceStore = useWorkspaceStore()

const schema = z.object({
  name: z.string(t('board.name.required')).min(1, t('board.name.required')),
  description: z.string().optional(),
  color: z.string().nullable(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: props.board?.name ?? '',
  description: props.board?.description ?? '',
  color: props.board?.color ?? null
})

const open = defineModel<boolean>('open', {
  type: Boolean,
  required: true,
  default: false
})

const loading = ref<boolean>(false)

const submit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true

  const boardId = props.board?.id
  if (!boardId) {
    loading.value = false

    toast.add({
      title: t('error.title'),
      description: t('error.500'),
      icon: 'i-lucide:alert-circle',
      color: 'error',
      duration: 3000
    })
    return
  }

  try {
    await $fetch(`/api/boards/${boardId}`, {
      method: 'PATCH',
      body: event.data
    })

    toast.add({
      title: t('success.title'),
      description: t('board.update.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    workspaceStore.current.boards.find((b: any) => b.id === boardId).name = event.data.name
    workspaceStore.current.boards.find((b: any) => b.id === boardId).color = event.data.color

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
