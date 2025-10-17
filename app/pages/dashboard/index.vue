<template>
  <WorkspaceView
    v-if="workspaceStore.workspaces.length"
  />

  <WorkspaceCreate v-else />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

const workspaces = await $fetch('/api/workspaces')

if (workspaces.length > 0) {
  workspaceStore.workspaces = workspaces

  let workspace = workspaceStore.workspaces.find((w: any) => w.id === localStorage.getItem('workspace.current.id'))

  if (!workspace) {
    workspace = workspaceStore.workspaces[0]

    localStorage.setItem('workspace.current.id', workspace.id)
  }

  workspaceStore.current = workspace

  boardStore.boards = workspaceStore.current.boards
}
</script>
