export const useInbox = () => {
  const { t } = useI18n()
  const localePath = useLocalePath()

  const inboxItemTitle = (inboxItem: InboxItem, stripHtmlTags = true) => {
    let message = ''

    if (inboxItem.relatedType === 'Workspace') {
      message = t(inboxItem.message, {
        workspace: inboxItem.workspace.name
      })
    } else if (inboxItem.relatedType === 'WorkspaceMember') {
      message = t(inboxItem.message, {
        workspace: inboxItem.workspace.name
      })
    } else if (inboxItem.relatedType === 'TaskAssignee') {
      message = t(inboxItem.message, {
        task: `<a
          href="${localePath({ name: 'dashboard-index-tasks-task', params: { task: inboxItem.task.id } })}"
          class="text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary"
        >${inboxItem.task.name}</a>`
      })
    } else if (inboxItem.relatedType === 'Task') {
      message = t(inboxItem.message, {
        task: inboxItem.task.name
      })
    } else if (inboxItem.relatedType === 'Comment') {
      message = t(inboxItem.message, {
        task: inboxItem.task.name.trim(),
        comment: inboxItem.comment.content
      })
    }

    return stripHtmlTags ? message.replace(/<[^>]*>/g, '') : message
  }

  return {
    inboxItemTitle
  }
}
