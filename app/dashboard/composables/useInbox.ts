export const useInbox = () => {
  const { t } = useI18n()

  const inboxItemTitle = (inboxItem: InboxItem) => {
    if (inboxItem.relatedType === 'Workspace') {
      return t(inboxItem.message, { workspace: inboxItem.workspace.name })
    } else if (inboxItem.relatedType === 'WorkspaceMember') {
      return t(inboxItem.message, { workspace: inboxItem.workspace.name })
    } else if (inboxItem.relatedType === 'TaskAssignee') {
      return t(inboxItem.message, { task: inboxItem.task.name })
    } else if (inboxItem.relatedType === 'Task') {
      return t(inboxItem.message, { task: inboxItem.task.name })
    } else if (inboxItem.relatedType === 'Comment') {
      return t(inboxItem.message, { task: inboxItem.task.name.trim(), comment: inboxItem.comment.content })
    }

    return ''
  }

  return {
    inboxItemTitle
  }
}
