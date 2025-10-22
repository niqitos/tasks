declare type WorkspaceMember = {
  id: number
  workspace?: Workspace
  workspaceId?: string
  user?: User
  userId?: string
  role?: SupportedRole
  color?: SupportedColor
  invitedAt?: Date
  joinedAt?: Date
  invitedById?: string
  invitedBy?: User
  deletedAt?: Date
}
