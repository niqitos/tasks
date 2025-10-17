<template>
  <UModal
    v-model:open="userStore.edit"
    :title="$t('user.edit.title')"
  >
    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="submit"
      >
        <UFormField
          :label="$t('fields.name.label')"
          class="w-full"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <UFormField
          :label="$t('fields.lastname.label')"
          class="w-full"
          name="lastname"
        >
          <UInput
            v-model="state.lastname"
            :ui="{
              root: 'w-full'
            }"
          />
        </UFormField>

        <div class="flex justify-end">
          <UButton
            :label="$t('user.edit.submit')"
            icon="i-lucide:save"
            :loading
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const userStore = useUserStore()

const toast = useToast()
const { t } = useI18n()

const schema = z.object({
  name: z.string(t('fields.name.required')).min(1, t('fields.name.required')),
  lastname: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: userStore.user.name,
  lastname: userStore.user.lastname || ''
})

const loading = ref<boolean>(false)

const submit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true

  console.log(event.data)
  try {
    await $fetch(`/api/users/${userStore.user.id}`, {
      method: 'PATCH',
      body: event.data
    })

    toast.add({
      title: t('success.title'),
      description: t('user.update.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    userStore.edit = false
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
