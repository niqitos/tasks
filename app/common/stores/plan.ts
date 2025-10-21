export const usePlanStore = defineStore('plan', () => {
  const unlimited = ref<string>('unlimited')

  const limitations = reactive<any>({
    free: {
      workspaces: {
        max: 1,
        boards: {
          max: 3,
          tasks: {
            max: unlimited.value,
            files: {
              max: 1
            },
            assignees: {
              max: 1
            }
          }
        },
        members: {
          max: 1
        }
      },
      view: {
        boards: true,
        calendar: false
      },
      support: false
    },
    team: {
      workspaces: {
        max: 10,
        boards: {
          max: unlimited.value,
          tasks: {
            max: unlimited.value,
            files: {
              max: 1
            },
            assignees: {
              max: 10
            }
          }
        },
        members: {
          max: 10
        }
      },
      view: {
        boards: true,
        calendar: true
      },
      support: true
    },
    business: {
      workspaces: {
        max: unlimited.value,
        boards: {
          max: unlimited.value,
          tasks: {
            max: unlimited.value,
            files: {
              max: unlimited.value
            },
            assignees: {
              max: unlimited.value
            }
          }
        },
        members: {
          max: unlimited.value
        }
      },
      view: {
        boards: true,
        calendar: true
      },
      support: true
    },
    enterprise: {
      workspaces: {
        max: unlimited.value,
        boards: {
          max: unlimited.value,
          tasks: {
            max: unlimited.value,
            files: {
              max: unlimited.value
            },
            assignees: {
              max: unlimited.value
            }
          }
        },
        members: {
          max: unlimited.value
        }
      },
      view: {
        boards: true,
        calendar: true
      }
    }
  })

  const currency = ref<string>('USD')

  const currencies = reactive<any>({
    USD: {
      symbol: '$',
      name: 'US Dollar',
      code: 'USD'
    },
    EUR: {
      symbol: '€',
      name: 'Euro',
      code: 'EUR'
    },
    GBP: {
      symbol: '£',
      name: 'British Pound',
      code: 'GBP'
    }
  })

  const cycle = ref<'monthly'|'annually'>('monthly')

  const cycles = reactive<any>({
    monthly: {
      label: 'monthly'
    },
    annually: {
      label: 'annually'
    }
  })

  const prices = reactive<any>({
    free: {
      [currencies.USD.code]: {
        [cycles.monthly.label]: 0,
        [cycles.annually.label]: 0
      }
    },
    team: {
      [currencies.USD.code]: {
        [cycles.monthly.label]: 2.99,
        [cycles.annually.label]: 29.99
      }
    },
    business: {
      [currencies.USD.code]: {
        [cycles.monthly.label]: 8.99,
        [cycles.annually.label]: 89.99
      }
    },
    enterprise: {
      [currencies.USD.code]: {
        [cycles.monthly.label]: false,
        [cycles.annually.label]: false
      }
    }
  })

  return {
    unlimited,
    limitations,
    currency,
    currencies,
    cycle,
    cycles,
    prices
  }
})
