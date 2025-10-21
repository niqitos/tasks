<template>
  <UFormField
    :label="$t('background.type.color.label')"
    name="color"
  >
    <USelect
      v-model="model"
      value-key="value"
      :items="colors"
      :ui="{
        base: 'w-full'
      }"
    />
  </UFormField>
</template>

<script lang="ts" setup>
const { colors } = useColors()

const model = defineModel<any>()
</script>
