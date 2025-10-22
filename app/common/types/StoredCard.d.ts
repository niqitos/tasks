declare type StoredCard = {
  id: string
  userId: string
  provider: string
  providerCardId: string
  last4?: string
  brand?: string
  expMonth?: number
  expYear?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  user?: User
  subscriptions?: Subscription[]
}
