<template>
  <div
    v-if="workspaceStore.workspaces.length"
    class="flex flex-row items-start min-h-[inherit] w-full overflow-y-visible py-4 sm:px-6 lg:px-8 overflow-x-auto space-x-4"
  >
    <!-- <BoardColumn
      v-for="(column, columnIndex) in boardStore.board.columns"
      :key="column.id"
      :column="column"
      :columnIndex="columnIndex"
    /> -->

    <Board
      v-for="(board, boardIndex) in workspaceStore.workspaces[0].boards"
      :key="board.id"
      :board="board"
      :boardIndex="boardIndex"
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

  <BoardCreateForm v-else />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const boardStore = useBoardStore()
const workspaceStore = useBoardStore()

const workspaces = await $fetch('/api/workspaces')

workspaceStore.workspaces = workspaces

const route = useRoute()
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
