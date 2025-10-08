<script setup lang="ts">
const props = defineProps({
  column: {
    type: Object,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  }
})

const boardStore = useBoardStore()
const router = useRouter()

const editNameState = ref(false)
const newTaskName = ref('')

const addTask = () => {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex
  })
  newTaskName.value = ''
}

const deleteColumn = (columnIndex: any) => {
  boardStore.deleteColumn(columnIndex)
}

const dropItem = (event: any, { toColumnIndex, toTaskIndex }: any) => {
  const type = event.dataTransfer.getData('type')
  const fromColumnIndex = event.dataTransfer.getData('from-column-index')

  if (type === 'task') {
    const fromTaskIndex = event.dataTransfer.getData('from-task-index')

    boardStore.moveTask({
      fromTaskIndex,
      toTaskIndex,
      fromColumnIndex,
      toColumnIndex
    })
  } else if (type === 'column') {
    boardStore.moveColumn({
      fromColumnIndex,
      toColumnIndex
    })
  }
}

const goToTask = (taskId: any) => {
  router.push(`/tasks/${taskId}`)
}

const pickupColumn = (event: any, fromColumnIndex: any) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('type', 'column')
  event.dataTransfer.setData('from-column-index', fromColumnIndex)
}

const pickupTask = (event: any, { fromColumnIndex, fromTaskIndex }: any) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('type', 'task')
  event.dataTransfer.setData('from-column-index', fromColumnIndex)
  event.dataTransfer.setData('from-task-index', fromTaskIndex)
}
</script>

<template>
  <UCard
    :ui="{
      root: 'flex-1 rounded bg-elevated min-w-80',
      body: 'sm:p-4'
    }"
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropItem($event, { toColumnIndex: columnIndex })"
  >
    <div class="flex items-center justify-between font-bold mb-4">
      <div>
        <UInput
          v-if="editNameState"
          type="text"
          v-model="column.name"
        />

        <h2
          v-else
          v-text="column.name"
        />
      </div>

      <div>
        <UButton
          icon="i-lucide:square-pen"
          class="mr-2"
          @click="editNameState = !editNameState"
        />

        <UButton
          icon="i-lucide:trash"
          color="red"
          @click="deleteColumn(columnIndex)"
        />
      </div>
    </div>

    <ul>
      <li
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
      >
        <UCard
          class="mb-4"
          @click="goToTask(task.id)"
          draggable="true"
          @dragstart="pickupTask($event, {
            fromColumnIndex: columnIndex,
            fromTaskIndex: taskIndex
          })"
          @drop.stop="dropItem($event, {
            toColumnIndex: columnIndex,
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
      :placeholder="$t('task.create')"
      icon="i-lucide:circle-plus"
      :ui="{
        root: 'w-full'
      }"
      @keyup.enter="addTask"
    />
  </UCard>
</template>
