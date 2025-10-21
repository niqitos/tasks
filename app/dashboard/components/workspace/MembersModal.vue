<template>
  <UModal
    v-model:open="open"
    :title="$t('workspaces.members.title')"
    :ui="{
      footer: 'flex-col items-start'
    }"
  >
    <UAvatarGroup
      :ui="{
        root: 'ml-4'
      }"
      :max="4"
    >
      <UButton
        color="neutral"
        variant="soft"
        icon="i-lucide:plus"
      />

      <UAvatar
        v-for="member in workspaceStore.current?.members"
        :key="member.id"
        :src="member.user?.avatar"
        :alt="`${member.user?.name}${member.user?.lastname ? ` ${member.user?.lastname}` : ''}`"
      />
    </UAvatarGroup>

    <template #body>
      <h3
        class="text-highlighted font-semibold mb-3"
        v-text="$t('workspaces.members.add.title')"
      />

      <UForm
        v-if="roleStore.canAddMembersToWorkspace"
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="submit"
      >
        <FieldUserSearch
          ref="userSearchRef"
          v-model="state.user"
          required
        />

        <UFormField
          :label="$t('workspaces.members.add.role.label')"
          name="role"
          required
          :ui="{
            root: 'mt-4'
          }"
        >
          <USelectMenu
            v-model="state.role"
            :search-input="false"
            icon="i-lucide:key-round"
            :placeholder="$t('workspaces.members.add.role.placeholder')"
            value-key="value"
            :items="roleStore.roles"
            :ui="{
              base: 'w-full'
            }"
          />
        </UFormField>

        <FieldColorSelect
          v-model="state.color"
        />

        <UButton
          trailing-icon="i-lucide:arrow-right"
          :label="$t('workspaces.members.add.title')"
          type="submit"
          :loading="loading"
          size="xl"
          :ui="{
            base: 'w-full mt-6 text-sm font-bold flex justify-center items-center cursor-pointer',
            trailingIcon: 'size-5'
          }"
        />
      </UForm>

      <UpgradeButton v-else />
    </template>

    <template #footer>
      <UPageList
        class="w-full"
      >
        <UPageCard
          v-for="(member, index) in workspaceStore.current?.members"
          :key="index"
          variant="ghost"
          :ui="{
            root: 'relative',
            container: 'px-0 py-2 sm:px-0 sm:py-2',
            body: 'w-full flex justify-between'
          }"
        >
          <template #body>
            <UUser
              :name="`${member.user?.name}${member.user?.lastname ? ` ${member.user?.lastname}` : ''}`"
              :description="$t(`role.${member.role}.label`)"
              :avatar="{
                src: member.user?.avatar,
                alt: `${member.user?.name}${member.user?.lastname ? ` ${member.user?.lastname}` : ''}`
              }"
              size="xl"
              :ui="{
                avatar: `border-2 border-${member.color}`
              }"
            />

            <WorkspaceMembersDelete
              v-if="member.user?.id !== workspaceStore.current.creatorId"
              :member
            />
          </template>
        </UPageCard>
      </UPageList>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const localePath = useLocalePath()
const { t } = useI18n()
const toast = useToast()

const workspaceStore = useWorkspaceStore()
const roleStore = useRoleStore()
const userStore = useUserStore()

const userSearchRef = ref<any>(null)

const schema = z.object({
  user: z.string(t('workspaces.members.add.user.required')),
  role: z.string(t('workspaces.members.add.user.required')),
  color: z.string().optional(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  user: undefined,
  role: undefined,
  color: 'transparent'
})

const open = ref<boolean>(false)
const loading = ref<boolean>(false)

const submit = async (event: FormSubmitEvent<Schema>) => {
  loading.value = true

  try {
    const member = await $fetch(`/api/workspaces/${workspaceStore.current.id}/members`, {
      method: 'POST',
      body: event.data
    })

    workspaceStore.current.members.push(member)

    toast.add({
      title: t('success.title'),
      description: t('workspaces.members.add.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    loading.value = false

    state.user = undefined
    state.role = undefined
    userSearchRef.value.reset()
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
