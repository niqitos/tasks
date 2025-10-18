export const useRoleStore = defineStore('role', () => {
  const { t } = useI18n()

  const roles = ref<any>([
    {
      value: 'guest',
      label: t('role.guest.label')
    },
    {
      value: 'maintainer',
      label: t('role.maintainer.label')
    },
    {
      value: 'admin',
      label: t('role.admin.label')
    }
  ])

  return {
    roles
  }
})
