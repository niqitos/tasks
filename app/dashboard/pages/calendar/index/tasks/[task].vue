<template>
  <TaskEditModal
    :to-path="localePath('calendar-index-tasks-task')"
    :close-path="localePath('calendar')"
  />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: [
    'auth',
    'calendar'
  ]
})

const localePath = useLocalePath()
</script>
