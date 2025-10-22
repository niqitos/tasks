declare type Workspace = {
  id: string
  name: string
  description?: string
  backgroundType: SupportedBackgroundType
  background?: any
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date

  creatorId: string
  creator: User

  boards:  Board[]
  members: WorkspaceMember[]
  inboxItems?: InboxItem[]
}
