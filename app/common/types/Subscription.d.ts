declare type Subscription = {
  id: string
  userId: string
  storedCardId: string
  amount: number
  currency: SupportedCurrency
  interval: string
  nextChargeAt?: Date
  active: boolean
  createdAt?: Date
  updatedAt?: Date
  cancelledAt?: Date
  user?: User
  storedCard?: StoredCard
}
