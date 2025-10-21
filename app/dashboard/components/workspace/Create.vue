<template>
  <div class="flex justify-center items-center min-h-[inherit] w-full">
    <div class="space-y-4 min-w-76">
      <h2
        class="text-2xl font-bold"
        v-text="$t('workspaces.create.title')"
      />

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField
          :label="$t('workspaces.name.label')"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            :placeholder="$t('workspaces.name.placeholder')"
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <UFormField
          :label="$t('workspaces.description.label')"
          name="description"
        >
          <UTextarea
            v-model="state.description"
            :placeholder="$t('workspaces.description.placeholder')"
            autoresize
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <FieldBackgroundTypeSelet
          v-model="state.backgroundType"
        />

        <FieldColorSelect
          v-if="state.backgroundType === 'color'"
          v-model="state.color"
          @update:model-value="workspaceStore.tempBackground = `bg-${state.color}-300 dark:bg-${state.color}-950`"
        />

        <UFormField
          v-else-if="state.backgroundType === 'image'"
          :label="$t('background.type.image.label')"
          name="image"
        >
          <UFileUpload
            v-model="file"
            accept="image/*"
            class="w-full"
          />
        </UFormField>

        <UButton
          trailing-icon="i-lucide:arrow-right"
          :label="$t('workspaces.create.title')"
          type="submit"
          :loading="loading"
          size="xl"
          :ui="{
            base: 'w-full mt-6 text-sm font-bold flex justify-center items-center cursor-pointer',
            trailingIcon: 'size-5'
          }"
        />
      </UForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const { t } = useI18n()
const toast = useToast()

const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

const schema = z.object({
  name: z.string(t('workspaces.name.required')).min(1, t('workspaces.name.required')),
  description: z.string().optional(),
  backgroundType: z.string(),
  color: z.string().nullable(),
  image: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  description: '',
  backgroundType: 'color',
  color: null,
  image: undefined
})

const emit = defineEmits(['created'])

const file = ref<File>()

const loading = ref<boolean>(false)

const submit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true

  try {
    const workspace = await $fetch('/api/workspaces', {
      method: 'POST',
      body: {
        ...event.data,
        background: {
          color: event.data.color,
          image: event.data.image
        }
      }
    })

    workspaceStore.workspaces.push(workspace)

    workspaceStore.current = workspace

    boardStore.boards = workspaceStore.current.boards

    toast.add({
      title: t('success.title'),
      description: t('workspaces.create.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    loading.value = false
    emit('created')
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
