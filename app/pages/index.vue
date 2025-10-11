<template>
  <WorkspaceView
    v-if="workspaceStore.workspaces.length"
  />

  <WorkspaceCreate v-else />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

const workspaces = await $fetch('/api/workspaces')

if (workspaces.length > 0) {
  workspaceStore.workspaces = workspaces
  workspaceStore.current = workspaceStore.workspaces[0]
  boardStore.boards = workspaceStore.current.boards
}
</script>
