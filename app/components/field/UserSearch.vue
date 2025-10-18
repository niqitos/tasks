<template>
  <UFormField
    :label="$t('workspaces.members.add.user.label')"
    name="user"
  >
    <USelectMenu
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

const model = defineModel()

const search = useDebounceFn(async () => {
  if (searchTerm.value.length === 0) {
    items.value = []

    return
  }

  loading.value = true

  try {
    const res = await $fetch(`/api/users/search?q=${encodeURIComponent(searchTerm.value)}`)

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
</script>
