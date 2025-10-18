<template>
  <UInput
    v-if="rename"
    ref="renameInputRef"
    v-model="board.name"
    variant="none"
    :ui="{
      base: 'p-0',
      trailing: 'pr-0'
    }"
  >
    <template #trailing>
      <UButton
        color="success"
        variant="link"
        icon="i-lucide:check"
        :aria-label="'Edit'"
        :loading="renaming"
        @click="update"
      />

      <UButton
        color="neutral"
        variant="link"
        icon="i-lucide:x"
        :aria-label="'Close'"
        @click="closeRename"
      />
    </template>
  </UInput>

  <UButton
    v-else
    :label="board.name"
    color="neutral"
    variant="link"
    trailing-icon="i-lucide:pen"
    :ui="{
      base: 'p-0',
      trailingIcon: 'size-4'
    }"
    @click="openRename"
  />
</template>

<script lang="ts" setup>
const props = defineProps({
  board: {
    type: Object,
    required: true
  }
})

const { t } = useI18n()
const toast = useToast()

const renameInputRef = ref<any>(null)
const rename = ref<any>(false)
const renaming = ref<any>(false)

const update = async () => {
  renaming.value = true

  try {
    await $fetch(`/api/boards/${props.board.id}`, {
      method: 'PATCH',
      body: {
        name: props.board.name
      }
    })

    closeRename()

    toast.add({
      title: t('success.title'),
      description: t('board.update.success.description'),
      icon: 'i-lucide:circle-check',
      color: 'success',
      duration: 3000
    })

    renaming.value = false
  } catch (error: any) {
    renaming.value = false

    toast.add({
      title: t('error.title'),
      description: t('error.500'),
      icon: 'i-lucide:circle-check',
      color: 'error',
      duration: 3000
    })
  }
}

const openRename = async () => {
  rename.value = true

  await nextTick()

  renameInputRef.value.inputRef.focus()
}

const closeRename = async () => {
  rename.value = false
}

onClickOutside(renameInputRef, () => {
  closeRename()
})
</script>
