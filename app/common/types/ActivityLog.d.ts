declare type ActivityLog = {
  id: number
  logName?: string
  description?: string
  subjectId?: string
  subjectType?: string
  event?: string
  causedBy?: User
  causedById?: string
  properties?: object
  createdAt: Date
  updatedAt: Date
}
