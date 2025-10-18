export const usePlanStore = defineStore('plan', () => {
  const unlimited = reactive<string>('unlimited')

  const limitations = reactive({
    free: {
      workspaces: {
        max: 1,
        boards: {
          max: 3,
          tasks: {
            max: unlimited,
            attachments: {
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
      }
    },
    team: {
      workspaces: {
        max: 10,
        boards: {
          max: unlimited,
          tasks: {
            max: unlimited,
            attachments: {
              max: 1
            },
            assignees: {
              max: unlimited
            }
          }
        },
        members: {
          max: 5
        }
      }
    },
    business: {
      workspaces: {
        max: unlimited,
        boards: {
          max: unlimited,
          tasks: {
            max: unlimited,
            attachments: {
              max: unlimited
            },
            assignees: {
              max: unlimited
            }
          }
        },
        members: {
          max: unlimited
        }
      }
    },
    enterprise: {
      workspaces: {
        max: unlimited,
        boards: {
          max: unlimited,
          tasks: {
            max: unlimited,
            attachments: {
              max: unlimited
            },
            assignees: {
              max: unlimited
            }
          }
        },
        members: {
          max: unlimited
        }
      }
    }
  })

  return {
    unlimited,
    limitations
  }
})
