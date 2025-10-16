<template>
  <UTooltip
    :delay-duration="0"
    :text="fullName"
  >
    <UAvatar
      :src="user.avatar"
      :alt="fullName"
    />
  </UTooltip>
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
