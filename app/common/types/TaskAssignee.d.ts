declare type TaskAssignee = {
  id: string
  task?: Task
  taskId: String
  user: User
  userId: string

  assignerId: string
  assigner: User

  assignedAt?: Date
  deletedAt?:  Date
}
