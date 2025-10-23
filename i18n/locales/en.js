export default {
  app: {
    name: 'Tasks'
  },
  cancel: 'Cancel',
  or: 'or',
  mb: 'MB',
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Enter your name',
      required: 'Name is required',
      invalid: 'Invalid name',
    },
    lastname: {
      label: 'Lastname',
      placeholder: 'Enter your lastname',
      invalid: 'Invalid lastname'
    },
    email: {
      label: 'Email',
      placeholder: 'Enter your email',
      invalid: 'Invalid email'
    },
    password: {
      label: 'Password',
      placeholder: 'Enter your password',
      required: 'Password is required',
      min: 'Must be at least 8 characters'
    }
  },
  role: {
    guest: {
      label: 'Guest'
    },
    maintainer: {
      label: 'Maintainer'
    },
    admin: {
      label: 'Admin'
    }
  },
  background: {
    type: {
      label: 'Background Type',
      color: {
        label: 'Color'
      },
      image: {
        label: 'Image'
      }
    }
  },
  color: {
    transparent: {
      label: 'None'
    },
    primary: {
      label: 'Primary'
    },
    secondary: {
      label: 'Secondary'
    },
    success: {
      label: 'Green'
    },
    info: {
      label: 'Blue'
    },
    warning: {
      label: 'Yellow'
    },
    error: {
      label: 'Red'
    }
  },
  register: {
    title: 'Sign up for a free account',
    description: 'Sign up for a free account',
    already: 'Already registered?',
    login: {
      button: 'Log in',
      text: 'to your account'
    },
    submit: 'Sign Up',
    success: {
      description: 'Account created successfully.'
    },
    error: {
      409: 'An account with this email already exists.',
      password: 'Password is too weak.'
    }
  },
  login: {
    title: 'Log in to your account',
    description: 'Log in to your account',
    notRegistered: 'Don\'t have an account?',
    signup: {
      button: 'Sign Up',
      text: 'for one.'
    },
    submit: 'Log in',
    success: {
      description: 'Logged in successfully.'
    },
    error: {
      400: 'Incorrect email or password, please try again.',
      401: 'Invalid email, please check.',
      password: 'Password is minimum 8 characters, please change.',
    }
  },
  home: {
    title: 'Home',
    description: 'Home',
    hero: {
      headline: 'Manage projects',
      title: 'Taskboard',
      description: 'The flexible way to manage your projects, big or small.',
      links: {
        start: 'Get started'
      }
    },
    features: {
      title: 'Core Features',
      workspaces: {
        title: 'Dedicated Projects',
        desc: 'Organize related projects and team members into distinct private or shared environments.'
      },
      boards: {
        title: 'Kanban Boards',
        desc: 'Visualize workflow progress with custom columns (lists). Drag-and-drop tasks between stages.'
      },
      tasks: {
        title: 'Feature-Rich Tasks (Cards)',
        desc: 'Each task holds all necessary details: deadlines, priority, status, and related content.'
      },
      calendar: {
        title: 'Event calendar',
        desc: 'Plan task flow for today, this week or this month.'
      },
      inbox: {
        title: 'Inbox',
        desc: 'Track project changes via email and push notifications.'
      },
      user_assign: {
        title: 'Project User Management',
        desc: 'Assign roles (Admin, Member, Guest) and manage access permissions at the project level.'
      },
      task_assign: {
        title: 'Assign Users to Tasks',
        desc: 'Quickly add team members to specific tasks to clarify ownership and responsibility.'
      },
      attachments: {
        title: 'File Attachments',
        desc: 'Upload files and documents directly to any task card for easy access to resources.'
      },
      comments: {
        title: 'Real-Time Comments',
        desc: 'Collaborate directly on tasks using real-time comments and mentions.'
      },
      tiptap: {
        title: 'Rich Task Descriptions',
        desc: 'Use the Tiptap editor for advanced formatting (markdown, lists, tables) in your task descriptions.'
      }
    }
  },
  upgrade: {
    title: 'Upgrade',
    description: 'Upgrade',
    headline: 'Coming Soon'
  },
  plans: {
    title: 'Pricing Plans',
    cycle: {
      monthly: {
        title: 'Billed Monthly',
        per: '/month'
      },
      annually: {
        title: 'Billed Annually',
        per: '/year'
      }
    },
    limits: {
      title: 'Limits',
      limited: '0 | {count} | Up to {count}',
      unlimited: 'Unlimited',
      workspaces: {
        title: 'Projects',
        limited: '0 Projects | {count} Project | Up to {count} Projects',
        unlimited: 'Unlimited Projects',
        boards: {
          title: 'Boards',
          limited: '0 Boards | {count} Board | Up to {count} Boards',
          unlimited: 'Unlimited Boards',
          tasks: {
            title: 'Tasks',
            limited: '0 Tasks | {count} Task | Up to {count} Tasks',
            unlimited: 'Unlimited Tasks',
            files: {
              title: 'Attachments per Task',
              limited: '0 Attachments per Task | {count} Attachment per Task | Up to {count} Attachments per Task',
              unlimited: 'Unlimited Attachments per Task'
            },
            assignees: {
              title: 'Assignees per Task',
              limited: '0 Assignees per Task | {count} Assignee per Task | Up to {count} Assignees per Task',
              unlimited: 'Unlimited Assignees per Task'
            }
          }
        },
        members: {
          title: 'Project Members',
          limited: '0 Project Members | {count} Project Member | Up to {count} Project Members',
          unlimited: 'Unlimited Project Members'
        }
      }
    },
    features: {
      title: 'Features',
      calendar: {
        title: 'Calendar'
      },
      inbox: {
        title: 'Notifications'
      },
      support: {
        title: 'Support'
      }
    },
    free: {
      name: 'Free',
      description: 'Tailored for personal projects and indie developers.',
      features: {
        //
      },
      action: 'Start Now',
      upgrade: 'Upgrade to Team'
    },
    team: {
      name: 'Team',
      description: 'Best suited for small teams.',
      features: {
        support: 'Basic support'
      },
      action: 'Go team',
      upgrade: 'Upgrade to Business'
    },
    business: {
      name: 'Business',
      description: 'Ideal for larger teams and organizations.',
      features: {
        support: '24/7 support'
      },
      action: 'Go Business',
      upgrade: 'Upgrade to Enterprise'
    },
    enterprise: {
      name: 'Enterprise',
      description: 'Ideal for big enterprises, heavy projects and large teams.',
      features: {
        support: '24/7 support'
      },
      action: 'Contact sales',
      upgrade: 'Get More'
    }
  },
  inbox: {
    title: 'Inbox',
    default: 'Inbox',
    filter: {
      all: 'All',
      unread: 'Unread'
    },
    items: {
      mark: {
        read: 'Mark as read',
        unread: 'Mark as unread',
        important: 'Mark as important',
        unimportant: 'Mark as unimportant'
      }
    },
    messages: {
      workspace: {
        created: 'Project {workspace} created',
        member: {
          created: 'You were added to project {workspace}',
          deleted: 'You were removed from project {workspace}'
        }
      },
      task: {
        created: 'Task {task} created',
        assignee: {
          created: 'You were assigned to task {task}',
          deleted: 'You were unassigned from task {task}'
        },
        completed: 'Task {task} completed',
        reopened: 'Task {task} reopened',
        comment: {
          created: 'New comment added to task {task}: {comment}'
        }
      }
    }
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Dashboard'
  },
  calendar: {
    title: 'Calendar',
    description: 'Calendar'
  },
  view: {
    boards: 'Boards',
    calendar: 'Calendar'
  },
  success: {
    title: 'Success!'
  },
  error: {
    title: 'Error!',
    500: 'Something went wrong 😒'
  },
  user: {
    edit: {
      button: 'User',
      title: 'Edit user',
      submit: 'Update'
    },
    update: {
      success: {
        description: 'User updated successfully'
      }
    }
  },
  settings: {
    edit: {
      title: 'Settings',
      button: 'Settings',
      language: 'Language',
      theme: 'Theme'
    }
  },
  workspaces: {
    create: {
      title: 'Create project',
      submit: 'Submit',
      success: {
        description: 'Project created successfully.'
      }
    },
    name: {
      label: 'Name',
      placeholder: 'Enter project name',
      required: 'Project name is required'
    },
    description: {
      label: 'Description',
      placeholder: 'Enter project description'
    },
    owner: 'Owner',
    member: 'Member',
    members: {
      title: 'Project members',
      add: {
        title: 'Add member',
        user: {
          label: 'User',
          placeholder: 'Search',
          required: 'Required'
        },
        role: {
          label: 'Role',
          placeholder: 'Select',
          required: 'Required'
        },
        success: {
          description: 'Project member added successfully'
        }
      },
      remove: {
        button: 'Remove member',
        title: 'Are you sure you want to remove this project member?',
        description: 'The user will have no access to the project.',
        submit: 'Yes, remove the project member',
        success: {
          description: 'The project member removed successfully'
        }
      }
    }
  },
  board: {
    default: {
      1: {
        name: 'To Do',
        description: 'Tasks waiting to be started'
      },
      2: {
        name: 'In Progress',
        description: 'Tasks currently in progress'
      },
      3: {
        name: 'Done',
        description: 'Completed tasks'
      }
    },
    create: {
      placeholder: 'Create board',
      success: {
        description: 'Board created successfully'
      }
    },
    update: {
      title: 'Edit board',
      submit: 'Submit',
      success: {
        description: 'Board updated successfully'
      }
    },
    name: {
      label: 'Name',
      placeholder: 'Enter board name',
      required: 'Board name is required'
    },
    description: {
      label: 'Description',
      placeholder: 'Enter board description'
    },
    delete: {
      button: 'Delete board',
      title: 'Are you sure you want to delete this board?',
      description: 'The board will be deleted along with all the tasks.',
      submit: 'Yes, delete the board',
      success: {
        description: 'The board deleted successfully'
      }
    }
  },
  task: {
    create: {
      placeholder: 'Create task',
      success: {
        description: 'Task created successfully'
      }
    },
    edit: 'Edit task',
    update: {
      button: 'Update',
      success: 'Task updated'
    },
    delete: {
      button: 'Delete task',
      title: 'Are you sure you want to delete this task?',
      description: 'You won\'t be able to restore it.',
      submit: 'Yes, delete the task',
      success: {
        description: 'The task deleted successfully'
      }
    },
    404: 'Task not found.',
    createdBy: 'Created By',
    createdAt: 'Created At',
    assignees: 'No assignees | Assignee | Assignees | Assignees',
    assign: {
      button: 'Assign',
      search: 'Search users...'
    },
    name: {
      label: 'Name',
      required: 'Name is required'
    },
    description: {
      label: 'Description',
      placeholder: 'Write something...'
    },
    files: {
      create: {
        label: 'Attach files',
        max: 'max.'
      },
      delete: {
        success: {
          description: 'Task file deleted successfully'
        }
      },
      label: 'Attached files',
      attached: 'Task has attached files'
    },
    startEndDates: {
      startAt: 'Start At',
      endAt: 'End At',
      placeholder: 'Select start and end date'
    },
    complete: {
      false: 'Mark as complete',
      true: 'Mark as incomplete'
    },
    comments: {
      label: 'Comments',
      placeholder: 'Write a comment...',
      reply: {
        label: 'Reply',
        placeholder: 'Write a reply...'
      }
    }
  },
  logout: {
    title: 'Logout'
  }
}
