declare type Inbox = {
  id: string
  name: string
  preferences?: Json
  user?: User
  userId?: string
  default?: boolean
  items: InboxItem[]
  createdAt?: Date
  updatedAt?: Date
}
