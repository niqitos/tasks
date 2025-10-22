declare type Comment = {
  id: string
  content: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  task: Task
  taskId: string
  author?: User
  authorId?: string
  parentId?: string
  parent?: Comment
  replies?: Comment[]
  inboxItems?: InboxItem[]
}
