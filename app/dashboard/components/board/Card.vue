<template>
  <UCard
    :ui="{
      root: 'flex-1 rounded bg-elevated min-w-80',
      body: 'p-3 sm:p-3'
    }"
    draggable="true"
    @dragover.prevent
    @drop="onDropCard"
  >
    <div class="flex items-center justify-between mb-3">
      <span
        class="text-sm"
        v-text="board.name"
      />

      <BoardDelete
        v-model:open="deleting"
        :board="board"
      />

      <UDropdownMenu
        :items="items"
        :content="{
          align: 'end',
          side: 'bottom',
          sideOffset: 8
        }"
        :ui="{
          content: 'w-48'
        }"
      >
        <UButton
          title="Open"
          icon="i-lucide:ellipsis-vertical"
          color="neutral"
          variant="link"
          :ui="{
            base: 'p-0',
            trailingIcon: 'size-4'
          }"
        />
      </UDropdownMenu>
    </div>

    <TaskCard
      v-for="(task, taskIndex) in board.tasks"
      :key="task.id"
      :task="task"
      draggable="true"
      @dragstart="dragstart($event, {
        fromBoardIndex: boardIndex,
        fromTaskIndex: taskIndex
      })"
      @dragover.prevent
      @drop.stop="drop($event, {
        toBoardIndex: boardIndex,
        toTaskIndex: taskIndex
      })"
    />

    <BoardEdit
      v-model:open="editing"
      :board="board"
    />

    <TaskCreate
      :board="board"
    />
  </UCard>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps({
  board: {
    type: Object,
    required: true
  },
  boardIndex: {
    type: Number,
    required: true
  }
})

const boardStore = useBoardStore()

const editing = ref<boolean>(false)
const deleting = ref<boolean>(false)

const items = ref<DropdownMenuItem[]>([
  {
    label: $t('board.update.title'),
    icon: 'i-lucide:pen',
    onSelect(e: Event) {
      editing.value = true
    }
  },
  {
    label: $t('board.delete.button'),
    icon: 'i-lucide:trash',
    color: 'error',
    onSelect(e: Event) {
      deleting.value = true
    }
  }
])

const dragstart = (event: any, { fromBoardIndex, fromTaskIndex }: any) => {
  event.dataTransfer.setData('drag-type', 'task')
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('from-board-index', fromBoardIndex)
  event.dataTransfer.setData('from-task-index', fromTaskIndex)
}

const drop = (event: any, { toBoardIndex, toTaskIndex }: any) => {
  const dragType = event.dataTransfer.getData('drag-type')

  if (dragType !== 'task') {
    return
  }

  const fromBoardIndex = event.dataTransfer.getData('from-board-index')
  const fromTaskIndex = event.dataTransfer.getData('from-task-index')

  const task: any = boardStore.boards[fromBoardIndex].tasks.splice(fromTaskIndex, 1)[0]
  boardStore.boards[toBoardIndex].tasks.splice(toTaskIndex, 0, task)

  store(fromBoardIndex, toBoardIndex)
}

const onDropCard = (event: any) => {
  const dragType = event.dataTransfer.getData('drag-type')

  if (dragType !== 'task') {
    return
  }

  const fromBoardIndex = event.dataTransfer.getData('from-board-index')
  const fromTaskIndex = event.dataTransfer.getData('from-task-index')
  const toBoardIndex = props.boardIndex

  const task = boardStore.boards[fromBoardIndex].tasks.splice(fromTaskIndex, 1)[0]
  boardStore.boards[toBoardIndex].tasks.push(task)

  store(fromBoardIndex, toBoardIndex)
}

const store = (fromBoardIndex: number, toBoardIndex: number) => {
  boardStore.boards[fromBoardIndex].tasks.forEach(async (task: any, index: number) => {
    await $fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      body: {
        position: index + 1,
        boardId: boardStore.boards[fromBoardIndex].id
      }
    })
  })

  if (fromBoardIndex !== toBoardIndex) {
    boardStore.boards[toBoardIndex].tasks.forEach(async (task: any, index: number) => {
      await $fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        body: {
          position: index + 1,
          boardId: boardStore.boards[toBoardIndex].id
        }
      })
    })
  }
}
</script>
