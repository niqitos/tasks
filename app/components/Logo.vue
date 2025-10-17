<template>
  <ULink
    :to="!isIndex ? localePath('index') : ''"
    class="flex items-center text-2xl font-bold text-default"
  >
    <UIcon
      name="i-lucide:square-kanban"
      class="text-primary-500 size-8"
    />

    <span
      class="pl-3"
      v-text="$t('app.name')"
    />
  </ULink>
</template>

<script lang="ts" setup>
const localePath = useLocalePath()
const route = useRoute()

const isIndex = computed<boolean>(() => route.path === localePath('index'))
</script>
