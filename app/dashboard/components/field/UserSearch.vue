<template>
  <UFormField
    :label="$t('workspaces.members.add.user.label')"
    name="user"
  >
    <USelectMenu
      v-model="localModal"
      v-model:open="open"
      v-model:search-term="searchTerm"
      icon="i-lucide:search"
      :placeholder="$t('workspaces.members.add.user.placeholder')"
      ignore-filter
      :loading
      :items="items"
      :ui="{
        base: 'w-full'
      }"
      @update:search-term="search()"
    />
  </UFormField>
</template>

<script lang="ts" setup>
const open = ref<boolean>(false)
const items = ref<any[]>()
const searchTerm = ref<string>('')
const loading = ref<boolean>(false)

const workspaceStore = useWorkspaceStore()

const localModal = ref<any>(null)

const model = defineModel<string>()

const search = useDebounceFn(async () : Promise<any> => {
  if (searchTerm.value.length === 0) {
    items.value = []

    return
  }

  loading.value = true

  try {
    const params = new URLSearchParams();
    params.append('q', searchTerm.value);
    if (workspaceStore.current?.id !== undefined && workspaceStore.current?.id !== null) {
      params.append('excludeWorkspaceId', String(workspaceStore.current.id));
    }

    const res = await $fetch<User[]>(`/api/users/search?${params}`)

    items.value = res?.map((user: any) => ({
      id: user.id,
      label: `${user.name}${user.lastname ? ` ${user.lastname}` : ''} (${user.email})`,
      avatar: {
        src: user.avatar,
        alt: `${user.name}${user.lastname ? ` ${user.lastname}` : ''}`
      },
      onSelect: ((e: Event) => model.value = user.id)
    }))

    open.value = true
  } finally {
    loading.value = false
  }
}, 300)

const reset = () => {
  localModal.value = null
}

defineExpose({
  reset
})
</script>
