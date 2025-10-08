<script setup lang="ts">
const boardStore = useBoardStore()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()

const newColumnName = ref<string>('')

const isModalOpen = computed(() => route.path === localePath('index-tasks-id'))

const addColumn = () => {
  boardStore.addColumn(newColumnName.value)
  newColumnName.value = ''
}

const closeModal = () => {
  navigateTo(localePath('/'))
}
</script>

<template>
  <div class="flex flex-row items-start min-h-[inherit] w-full overflow-auto p-4 space-x-4">
    <BoardColumn
      v-for="(column, columnIndex) in boardStore.board.columns"
      :key="column.id"
      :column="column"
      :columnIndex="columnIndex"
    />

    <UCard
      :ui="{
        root: 'flex-1 rounded bg-elevated min-w-80',
        body: 'sm:p-4'
      }"
    >
      <UInput
        v-model="newColumnName"
        type="text"
        placeholder="Create new column"
        icon="i-lucide:circle-plus"
        :ui="{
          root: 'w-full'
        }"
        @keyup.enter="addColumn"
      />
    </UCard>

    <UModal
      v-model:open="isModalOpen"
      :title="$t('task.edit')"
      @update:open="closeModal"
    >
      <template #body>
        <NuxtPage :key="route.fullPath" />
      </template>
    </UModal>
  </div>
</template>
