export const usePlanStore = defineStore('plan', () => {
  const { t } = useI18n()
  const localePath = useLocalePath()

  const userStore = useUserStore()

  const unlimited = reactive<string>('unlimited')

  const limitations = ref({
    free: {
      workspaces: {
        max: 1,
        boards: {
          max: 4,
          tasks: {
            max: 10,
            attachments: {
              max: 1
            },
            assignees: {
              max: 1
            }
          }
        }
      }
    },
    team: {
      workspaces: {
        max: unlimited.value,
        boards: {
          max: unlimited.value,
          tasks: {
            max: unlimited.value,
            attachments: {
              max: unlimited.value
            },
            assignees: {
              max: unlimited.value
            }
          }
        }
      }
    },
    business: {
      workspaces: {
        max: unlimited.value,
        boards: {
          max: unlimited.value,
          tasks: {
            max: unlimited.value,
            attachments: {
              max: unlimited.value
            },
            assignees: {
              max: unlimited.value
            }
          }
        }
      }
    },
    enterprise: {
      workspaces: {
        max: unlimited.value,
        boards: {
          max: unlimited.value,
          tasks: {
            max: unlimited.value,
            attachments: {
              max: unlimited.value
            },
            assignees: {
              max: unlimited.value
            }
          }
        }
      }
    }
  })

  const plans = computed(() => [
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
        label: t('plans.free.action'),
        to: localePath('dashboard')
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
        label: t('plans.team.action'),
        to: ['team', 'business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
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
        label: t('plans.business.action'),
        to: ['business', 'enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
      }
    // },
    // {
    //   title: t('plans.enterprise.name'),
    //   description: t('plans.enterprise.description'),
    //   price: '$99.99',
    //   features: [
    //     t('plans.enterprise.features.1'),
    //     t('plans.enterprise.features.2'),
    //     t('plans.enterprise.features.3'),
    //     t('plans.enterprise.features.4')
    //   ],
    //   button: {
    //     label: t('plans.enterprise.action'),
    //     to: ['enterprise'].includes(userStore.user.plan) ? localePath('dashboard') : localePath('upgrade')
    //   }
    }
  ])

  return {
    unlimited,
    limitations,
    plans
  }
})
