<template>
  <Transition name="fade">
    <UBadge
      v-if="label"
      :label
      :icon
      size="md"
      :color
      variant="soft"
    />
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  duration: {
    type: Number,
    default: 3000
  }
})

const label = ref<any>('')
const icon = ref<any>('')
const color = ref<any>('')

let timeout: ReturnType<typeof setTimeout> | null = null

function showToast(message: { title: any, icon: any, color: any }) {
  icon.value = message.icon
  color.value = message.color
  label.value = message.title

  if (timeout) {
    clearTimeout(timeout)
  }

  timeout = setTimeout(() => {
    icon.value = ''
    color.value = ''
    label.value = ''
  }, props.duration)
}

defineExpose({ showToast })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
