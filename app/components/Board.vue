<template>
  <UCard
    :ui="{
      root: 'flex-1 rounded bg-elevated min-w-80',
      body: 'sm:p-4'
    }"
    draggable="true"
    @dragstart.self="pickupBoard($event, boardIndex)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropItem($event, { toBoardIndex: boardIndex })"
  >
    <div class="flex items-center justify-between font-bold mb-4">
      <UInput
        v-if="editNameState"
        v-model="board.name"
        :ui="{
          trailing: 'pr-0'
        }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            icon="i-lucide:x"
            :aria-label="'Close'"
            @click="editNameState = false"
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
          trailingIcon: 'size-4'
        }"
        @click="editNameState = true"
      />

      <UButton
        icon="i-lucide:trash"
        color="error"
        variant="link"
        @click="deleteBoard(boardIndex)"
      />
    </div>

    <ul>
      <li
        v-for="(task, taskIndex) in board.tasks"
        :key="task.id"
      >
        <UCard
          class="mb-4"
          draggable="true"
          :ui="{
            body: 'sm:p-4'
          }"
          @click="goToTask(task.id)"
          @dragstart="pickupTask($event, {
            fromBoardIndex: boardIndex,
            fromTaskIndex: taskIndex
          })"
          @drop.stop="dropItem($event, {
            toBoardIndex: boardIndex,
            toTaskIndex: taskIndex
          })"
        >
          <strong v-text="task.name" />

          <p v-text="task.description" />
        </UCard>
      </li>
    </ul>

    <UTextarea
      v-model="newTaskName"
      size="xl"
      :rows="1"
      autoresize
      :placeholder="$t('task.create')"
      icon="i-lucide:circle-plus"
      :ui="{
        root: 'w-full'
      }"
      @keyup.enter="addTask"
    />
  </UCard>
</template>

<script setup lang="ts">
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

const userStore = useUserStore()
const workspaceStore = useWorkspaceStore()
const router = useRouter()

const editNameState = ref(false)
const newTaskName = ref('')

const addTask = async () => {
  const task = await $fetch('/api/tasks', {
    method: 'POST',
    body: {
      name: newTaskName.value,
      description: '',
      position: props.board.tasks.length + 1,
      boardId: props.board.id,
      creatorId: userStore.user.id
    }
  })

  props.board.tasks.push(task)

  newTaskName.value = ''
}

const deleteBoard = (boardIndex: any) => {
  // boardStore.deleteBoard(boardIndex)
}

const dropItem = (event: any, { toBoardIndex, toTaskIndex }: any) => {
  // const type = event.dataTransfer.getData('type')
  // const fromBoardIndex = event.dataTransfer.getData('from-board-index')

  // if (type === 'task') {
  //   const fromTaskIndex = event.dataTransfer.getData('from-task-index')

  //   boardStore.moveTask({
  //     fromTaskIndex,
  //     toTaskIndex,
  //     fromBoardIndex,
  //     toBoardIndex
  //   })
  // } else if (type === 'board') {
  //   boardStore.moveBoard({
  //     fromBoardIndex,
  //     toBoardIndex
  //   })
  // }
}

const goToTask = (taskId: any) => {
  router.push(`/tasks/${taskId}`)
}

const pickupBoard = (event: any, fromBoardIndex: any) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('type', 'board')
  event.dataTransfer.setData('from-board-index', fromBoardIndex)
}

const pickupTask = (event: any, { fromBoardIndex, fromTaskIndex }: any) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('type', 'task')
  event.dataTransfer.setData('from-board-index', fromBoardIndex)
  event.dataTransfer.setData('from-task-index', fromTaskIndex)
}
</script>
