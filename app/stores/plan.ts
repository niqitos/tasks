export const usePlanStore = defineStore('plan', () => {
  const { t } = useI18n()

  const plans = ref([
    {
      title: t('plans.free.name'),
      description: t('plans.free.description'),
      price: '$0',
      features: [
        t('plans.free.features.1'),
        t('plans.free.features.2'),
        t('plans.free.features.3')
      ],
      button: {
        label: t('plans.free.action')
      }
    },
    {
      title: t('plans.team.name'),
      description: t('plans.team.description'),
      price: '$4.99',
      features: [
        t('plans.team.features.1'),
        t('plans.team.features.2'),
        t('plans.team.features.3'),
        t('plans.team.features.4')
      ],
      button: {
        label: t('plans.team.action')
      },
      scale: true,
      highlight: true
    },
    {
      title: t('plans.business.name'),
      description: t('plans.business.description'),
      price: '$9.99',
      features: [
        t('plans.business.features.1'),
        t('plans.business.features.2'),
        t('plans.business.features.3'),
        t('plans.business.features.4')
      ],
      button: {
        label: t('plans.business.action')
      }
    }
  ])

  return {
    plans
  }
})
