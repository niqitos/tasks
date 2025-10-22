export type SaleStatus = 'paid' | 'failed' | 'refunded'

export interface User {
  id: number
  name: string
  lastname: string
  email: string
  avatar?: string
}

export interface InboxItem {
  id: number
  isRead?: boolean
  important?: boolean
  message: string
  // body: string
  relatedType: string
  createdAt: string
  workspace?: any
  task?: any
  comment?: any
  creator: User
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: string
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
