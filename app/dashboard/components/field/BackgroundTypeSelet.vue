<template>
   <UFormField
    :label="$t('background.type.label')"
    name="backgroundType"
  >
    <USelect
      v-model="model"
      value-key="value"
      :items="backgroundTypes"
      disabled
      :ui="{
        base: 'w-full'
      }"
    />
  </UFormField>
</template>

<script lang="ts" setup>
const { backgroundTypes } = useColors()

const model = defineModel<any>()
</script>
