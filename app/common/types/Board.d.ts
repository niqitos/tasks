declare type Board = {
  id: string
  name: string
  description?: string
  position: number
  color?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  workspaceId?: string
  workspace?: Workspace
  creatorId?: string
  creator?: User
  tasks: Task[]
}
