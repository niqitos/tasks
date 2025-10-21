<template>
  <TaskEditModal
    :to-path="localePath('calendar-index-tasks-task')"
    :close-path="localePath('calendar')"
  />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
})

const localePath = useLocalePath()
</script>
