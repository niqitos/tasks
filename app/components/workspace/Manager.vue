<template>
  <div>
    <UDropdownMenu
      :items="[
        ...workspaceStore.workspaces.map((w: any) => ({
          label: w.name,
          type: 'checkbox' as const,
          checked: w.id === workspaceStore.current?.id,
          onSelect: ((e: Event) => changeWorkspace(w))
        })),
        {
          type: 'separator' as const
        },
        {
          label: $t('workspaces.create.title'),
          icon: 'i-lucide:plus',
          onSelect(e: Event) {
            open = true
          }
        }
      ]"
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

const open = ref<boolean>(false)

const changeWorkspace = (workspace: any) => {
  workspaceStore.current = workspace
  boardStore.boards = workspace.boards
  localStorage.setItem('workspace.current.id', workspace.id)
}
</script>
