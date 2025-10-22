declare type User = {
  id: string
  name: string
  lastname?:  string
  email:  string
  // password:  string
  // salt:  string
  avatar?:  string
  plan: SupportedPlan
  planData?: object
  createdAt?: string
  updatedAt?: string
  deletedAt?: string

  // workspacesCreated Workspace[]
  // tasksAssigned     TaskAssignee[]
  // boardsCreated     Board[]
  // tasksCreated      Task[]
  // filesCreated      File[]
  // comments          Comment[]
  // workspaceMembers  WorkspaceMember[]
  // taskAssignees     TaskAssignee[]
  // invitedMembers    WorkspaceMember[]
  // activityLogs      ActivityLog[]
  // storedCards       StoredCard[]
  // subscriptions     Subscription[]
  // inboxes           Inbox[]
  // inboxItems        InboxItem[]
}
