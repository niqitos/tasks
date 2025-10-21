<template>
  <LoadingScreen />

  <DashboardHeader
    :class="workspaceStore.background"
  />

  <UMain
    :class="workspaceStore.background"
  >
    <slot />
  </UMain>

  <UserEdit />

  <SettingsEdit />
</template>

<script lang="ts" setup>
const workspaceStore = useWorkspaceStore()
</script>
