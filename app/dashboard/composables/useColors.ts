
export const useColors = () => {
  const { t } = useI18n()

  const backgroundTypes = ref<any[]>([
    {
      value: 'color',
      label: t('background.type.color.label')
    },
    {
      value: 'image',
      label: t('background.type.image.label')
    }
  ])

  const colors = ref<any[]>([
    {
      value: null,
      label: t('color.transparent.label')
    },
    // {
    //   value: 'primary',
    //   label: t('color.primary.label'),
    //   class: 'text-primary hover:text-primary'
    // },
    // {
    //   value: 'secondary',
    //   label: t('color.secondary.label'),
    //   class: 'text-secondary hover:text-secondary'
    // },
    {
      value: 'success',
      label: t('color.success.label'),
      class: 'text-success hover:text-success'
    },
    {
      value: 'info',
      label: t('color.info.label'),
      class: 'text-info hover:text-info'
    },
    {
      value: 'warning',
      label: t('color.warning.label'),
      class: 'text-warning hover:text-warning'
    },
    {
      value: 'error',
      label: t('color.error.label'),
      class: 'text-error hover:text-error'
    },
  ])

  return {
    backgroundTypes,
    colors
  }
}
