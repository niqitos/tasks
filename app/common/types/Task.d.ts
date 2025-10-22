declare type Task = {
  id: string
  name: string
  description: string
  position: number
  startAt: Date
  endAt: Date
  completedAt?: Date
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  boardId?: string
  board?: Board
  creatorId?: string
  creator: User
  assignees: TaskAssignee[]
  files: AttachmentFile[]
  comments?: Comment[]
  inboxItems?: InboxItem[]
}
