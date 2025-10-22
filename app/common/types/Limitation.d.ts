declare type unlimited = 'unlimited'

declare type limitation = {
  workspaces: {
    max: number | unlimited,
    boards: {
      max: number | unlimited,
      tasks: {
        max: number | unlimited,
        files: {
          max: number | unlimited
        },
        assignees: {
          max: number | unlimited
        }
      }
    },
    members: {
      max: number | unlimited
    }
  },
  view: {
    boards: boolean,
    calendar: boolean
  },
  support: boolean
}
