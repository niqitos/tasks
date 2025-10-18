<template>
  <div>
    <UDropdownMenu
      :items
      :content="{
        align: 'start',
        side: 'bottom',
        sideOffset: 8
      }"
    >
      <UButton
        color="neutral"
        variant="link"
        :label="workspaceStore.current?.name"
        :ui="{
          base: 'text-2xl font-bold p-0 text-default'
        }"
      />
    </UDropdownMenu>

    <UModal
      v-if="roleStore.canCreateWorkspaces"
      v-model:open="open"
      :ui="{
        content: 'max-w-84 sm:max-w-88 p-4 sm:p-6'
      }"
    >
      <template #content>
        <WorkspaceCreate
          @created="open = false"
        />
      </template>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()
const userStore = useUserStore()
const roleStore = useRoleStore()

const localePath = useLocalePath()

const open = ref<boolean>(false)

const items = computed(() => {
  let items = [
    ...workspaceStore.workspaces.map((w: any) => ({
      label: `${w.name} (${$t(`workspaces.${w.creatorId === userStore.user.id ? 'owner' : 'member'}`)})`,
      type: 'checkbox' as const,
      checked: w.id === workspaceStore.current?.id,
      onSelect: ((e: Event) => changeWorkspace(w))
    })),
    {
      type: 'separator' as const
    }
  ]

  if (roleStore.canCreateWorkspaces) {
    items.push({
      label: $t('workspaces.create.title'),
      icon: 'i-lucide:plus',
      onSelect(e: Event) {
        open.value = true
      }
    })
  } else {
    items.push({
      label: $t(`plans.${userStore.user.plan}.upgrade`),
      icon: 'i-lucide:circle-fading-arrow-up',
      color: 'primary',
      to: localePath('upgrade')
    })
  }

  return items
})

const changeWorkspace = (workspace: any) => {
  workspaceStore.current = workspace
  boardStore.boards = workspace.boards
  localStorage.setItem('workspace.current.id', workspace.id)
}
</script>
