<template>
  <UButton
    :label="$t(`plans.${userStore.user?.plan}.upgrade`)"
    icon="i-lucide:circle-fading-arrow-up"
    color="primary"
    variant="subtle"
    :to="localePath('upgrade')"
    :ui="{
      base: 'w-full flex justify-center items-center'
    }"
  />
</template>

<script lang="ts" setup>
const localePath = useLocalePath()

const userStore = useUserStore()
</script>
