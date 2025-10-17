<template>
  <div class="flex h-dvh w-full bg-[url('https://images.unsplash.com/photo-1628884598964-95c605566cee')] bg-cover bg-center">
    <div class="bg-default w-[516px] mx-auto md:mx-0 p-4 sm:p-12 flex flex-col justify-center">
      <Logo class="mb-6" />

      <UAuthForm
        :schema="schema"
        :title="$t('login.title')"
        :fields="fields"
        :ui="{
          header: 'text-left',
          description: 'text-muted text-sm mt-0.5'
        }"
        @submit="submit"
      >
        <template #description>
          {{ $t('login.notRegistered') }}

          <NuxtLink to="/register" class="font-bold text-primary-500 underline">{{ $t('login.signup.button') }}</NuxtLink>

          {{ $t('login.signup.text') }}
        </template>

        <template #submit>
          <UButton
            trailing-icon="i-lucide:arrow-right"
            :label="$t('login.submit')"
            type="submit"
            :loading="loading"
            size="xl"
            :ui="{
              base: 'w-full mt-6 rounded-full text-sm font-bold flex justify-center items-center cursor-pointer',
              trailingIcon: 'size-5'
            }"
          />
        </template>
      </UAuthForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  middleware: ['guest'],
  layout: 'auth'
})

const localePath = useLocalePath()
const toast = useToast()
const { t } = useI18n()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: t('fields.email.label'),
    placeholder: t('fields.email.placeholder'),
    size: 'xl',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: t('fields.password.label'),
    placeholder: t('fields.password.placeholder'),
    size: 'xl',
    required: true
  }
]

const schema = z.object({
  email: z.email(t('fields.email.invalid')),
  password: z.string(t('fields.password.required')).min(8, t('fields.password.min'))
})

type Schema = z.output<typeof schema>

const loading = ref<boolean>(false)

const submit = async (payload: FormSubmitEvent<Schema>) => {
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: payload.data.email,
        password: payload.data.password
      }
    })

    toast.add({
      title: t('success.title'),
      description: t('login.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    loading.value = false

    navigateTo(localePath('dashboard'))
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
