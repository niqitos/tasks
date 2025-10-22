declare type InboxItem = {
  id: string
  inbox: Inbox
  inboxId: string
  type: InboxItemType
  message: string
  isRead: boolean
  important: boolean
  relatedId: string
  relatedType: InboxRelatedType
  workspace: Workspace
  workspaceId?: string
  task?: Task
  taskId?: string
  comment?: Comment
  commentId?: string
  creator: User
  creatorId?: string
  createdAt?: Date
}
