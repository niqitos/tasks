<template>
  <div class="flex flex-row items-start min-h-[inherit] w-full overflow-y-visible py-4 sm:px-6 lg:px-8 overflow-x-auto space-x-4">
    <BoardCard
      v-for="(board, index) in boardStore.boards"
      :key="board.id"
      :board="board"
      :board-index="index"
      draggable="true"
      @dragstart.self="dragstart($event, index)"
      @dragenter.prevent
      @dragover.prevent
      @drop.stop="drop($event, index)"
    />

    <BoardCreate
      :workspace="workspaceStore.current"
    />

    <TaskEdit />
  </div>
</template>

<script lang="ts" setup>
const workspaceStore = useWorkspaceStore()
const boardStore = useBoardStore()

const dragstart = (event: any, fromBoardIndex: any) => {
  event.dataTransfer.setData('drag-type', 'board')
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('from-board-index', fromBoardIndex)
}

const drop = (event: any, toBoardIndex: any) => {
  if (event.dataTransfer.getData('drag-type') !== 'board') {
    return
  }

  const fromBoardIndex = event.dataTransfer.getData('from-board-index')

  const column: any = boardStore.boards.splice(fromBoardIndex, 1)[0]

  boardStore.boards.splice(toBoardIndex, 0, column)

  store()
}

const store = () => {
  boardStore.boards.forEach(async (board: any, index: number) => {
    await $fetch(`/api/boards/${board.id}`, {
      method: 'PATCH',
      body: {
        position: index + 1
      }
    })
  })
}
</script>
