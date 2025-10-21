<template>
  <TaskEditModal
    :to-path="localePath('dashboard-index-tasks-task')"
    :close-path="localePath('dashboard')"
  />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const localePath = useLocalePath()
</script>
