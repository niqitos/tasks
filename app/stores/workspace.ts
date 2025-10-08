import { v4 as uuid } from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useWorkspaceStore = defineStore('workspace', () => {
  const workspaces = ref<any[]>([])

  /**
   * Tasks
   */
  const getTask = computed(() => {
    return ''
  })

  const addTask = ({ columnIndex, taskName }: any) => {

  }

  const deleteTask = (taskId: any) => {

  }

  const moveTask = ({
    fromTaskIndex,
    toTaskIndex,
    fromBoardIndex,
    toBoardIndex
  }: any) => {

  }

  /**
   * Boards
   */
  const addBoard = (boardName: string) => {

  }

  const deleteBoard = (boardIndex: any) => {

  }

  const moveBoard = ({ fromBoardIndex, toBoardIndex }: any) => {

  }

  return {
    /* State */
    workspaces,
    /* Getters */
    getTask,
    /* Actions*/
    addBoard,
    addTask,
    deleteBoard,
    deleteTask,
    moveBoard,
    moveTask
  }
})
