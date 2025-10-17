<template>
  <UModal
    v-model:open="open"
    :title="$t('workspaces.members.title')"
    :ui="{
      footer: 'justify-end'
    }"
  >
    <UAvatarGroup
      :ui="{
        root: 'ml-4'
      }"
    >
      <UButton
        color="neutral"
        variant="solid"
        icon="i-lucide:plus"
      />

      <UAvatar
        v-for="member in workspaceStore.current?.members"
        :key="member.id"
        :src="member.user.avatar"
        :alt="`${member.user.name}${member.user.lastname ? ` ${member.user.lastname}` : ''}`"
      />
    </UAvatarGroup>

    <template #body>
      <UPageList>
        <UPageCard
          v-for="(member, index) in workspaceStore.current?.members"
          :key="index"
          variant="ghost"
          :ui="{
            root: 'relative',
            container: 'px-0 py-2 sm:px-0 sm:py-2'
          }"
        >
          <template #body>
            <UUser
              :name="`${member.user.name}${member.user.lastname ? ` ${member.user.lastname}` : ''}`"
              :description="member.role"
              :avatar="{
                src: member.user.avatar,
                alt: `${member.user.name}${member.user.lastname ? ` ${member.user.lastname}` : ''}`
              }"
              size="xl"
            />
          </template>
        </UPageCard>
      </UPageList>

      <UCommandPalette
        v-model:search-term="searchTerm"
        :loading
        :groups
        :placeholder="$t('task.assign.search')"
        class="h-80"
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const workspaceStore = useWorkspaceStore()

const open = ref<boolean>(false)
const searchTerm = ref<string>('')
const loading = ref<boolean>(false)

const groups = computed(() => [

])
</script>
