<template>
  <NuxtPage :key="route.fullPath" />
</template>

<script lang="ts" setup>
const route = useRoute()
</script>
