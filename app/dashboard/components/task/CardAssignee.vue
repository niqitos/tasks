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
import { computed, type PropType } from 'vue'

const props = defineProps<{
  user: User
}>()

const fullName = computed(() => `${props.user.name}${props.user.lastname ? ` ${props.user.lastname}` : ''}`)
</script>
