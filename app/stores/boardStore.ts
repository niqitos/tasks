import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import boardData from '@/data/board.json'

export const useBoardStore = defineStore('boardStore', () => {
  const board = useStorage('board', boardData)

  /**
   * Tasks
   */
  const getTask = computed(() => {
    return (taskId: any) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find(task => task.id === taskId)
        if (task) return task
      }
    }
  })

  const addTask = ({ columnIndex, taskName }: any) => {
    board?.value?.columns[columnIndex]?.tasks.push({
      id: uuid(),
      name: taskName,
      description: ''
    })
  }

  const deleteTask = (taskId: any) => {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex(task => task.id === taskId)

      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1)
        return
      }
    }
  }

  const moveTask = ({
    fromTaskIndex,
    toTaskIndex,
    fromColumnIndex,
    toColumnIndex
  }: any) => {
    const task: any = board.value.columns[fromColumnIndex]?.tasks.splice(
      fromTaskIndex,
      1
    )[0]

    board.value.columns[toColumnIndex]?.tasks.splice(toTaskIndex, 0, task)
  }

  /**
   * Columns
   */
  const addColumn = (columnName: string) => {
    board.value.columns?.push({
      name: columnName,
      tasks: []
    } as any)
  }

  const deleteColumn = (columnIndex: any) => {
    board.value.columns.splice(columnIndex, 1)
  }

  const moveColumn = ({ fromColumnIndex, toColumnIndex }: any) => {
    const column: any = board.value.columns.splice(fromColumnIndex, 1)[0]

    board.value.columns.splice(toColumnIndex, 0, column)
  }

  return {
    /* State */
    board,
    /* Getters */
    getTask,
    /* Actions*/
    addColumn,
    addTask,
    deleteColumn,
    deleteTask,
    moveColumn,
    moveTask
  }
})
