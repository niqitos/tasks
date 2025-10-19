<template>
  <USwitch
    v-model="model"
    unchecked-icon="i-lucide:x"
    checked-icon="i-lucide:check"
    :label="$t(`task.complete.${model ? 'true' : 'false'}`)"
  />
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: 'updated'): void
}>()

const completedAt = defineModel<Date | null>('completedAt')

const model = computed({
  get: () => !!completedAt.value,
  set: (val: boolean) => {
    completedAt.value = val ? new Date() : null

    emit('updated')
  }
})
</script>
