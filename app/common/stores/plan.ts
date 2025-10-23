export const usePlanStore = defineStore('plan', () => {
  const unlimited = ref<unlimited>('unlimited')

  const limitations = reactive<Record<SupportedPlan, Limitation>>({
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
      inbox: false,
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
      inbox: true,
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
      inbox: true,
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
      },
      inbox: true,
      support: true
    }
  })

  const currency = ref<SupportedCurrency>('USD')

  const currencies = reactive<Record<SupportedCurrency, Currency>>({
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

  const cycle = ref<SupportedCycle>('monthly')

  const cycles = reactive<Record<SupportedCycle, Cycle>>({
    monthly: {
      label: 'monthly'
    },
    annually: {
      label: 'annually'
    }
  })

  const prices = reactive<Record<SupportedPlan, Record<SupportedCurrency, Record<SupportedCycle, number|false>>>>({
    free: {
      USD: {
        monthly: 0,
        annually: 0
      },
      EUR: {
        monthly: 0,
        annually: 0
      },
      GBP: {
        monthly: 0,
        annually: 0
      }
    },
    team: {
      USD: {
        monthly: 2.99,
        annually: 29.99
      },
      EUR: {
        monthly: 2.99,
        annually: 29.99
      },
      GBP: {
        monthly: 2.99,
        annually: 29.99
      }
    },
    business: {
      USD: {
        monthly: 8.99,
        annually: 89.99
      },
      EUR: {
        monthly: 8.99,
        annually: 89.99
      },
      GBP: {
        monthly: 8.99,
        annually: 89.99
      }
    },
    enterprise: {
      USD: {
        monthly: false,
        annually: false
      },
      EUR: {
        monthly: false,
        annually: false
      },
      GBP: {
        monthly: false,
        annually: false
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
