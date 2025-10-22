declare type AttachmentFile = {
  id: string
  filename: string
  url: string
  mimeType?: string
  size: number
  createdAt?: Date
  deletedAt?: Date
  task: Task
  taskId: string
  creatorId: string
  creator: User
}
