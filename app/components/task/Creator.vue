<template>
  <div class="flex items-center gap-2">
    <UAvatar
      :src="user.avatar || ''"
      :alt="fullName"
      :icon="fullName ? '' : 'i-lucide:user'"
    />

    <div class="text-xs">
      <div
        class="text-muted"
        v-text="$t('task.createdBy')"
      />

      <div v-text="fullName" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const fullName = computed(() => `${props.user.name}${props.user.lastname ? ` ${props.user.lastname}` : ''}`)
</script>
