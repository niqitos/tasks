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
  register: {
    title: 'Sign up for a free account',
    already: 'Already registered?',
    login: {
      button: 'Log in',
      text: 'to your account'
    },
    submit: 'Sign Up',
    success: {
      description: 'Account created successfully.'
    }
  },
  login: {
    title: 'Log in to your account',
    notRegistered: 'Don\'t have an account?',
    signup: {
      button: 'Sign Up',
      text: 'for one.'
    },
    submit: 'Log in',
    success: {
      description: 'Logged in successfully.'
    }
  },
  home: {
    title: 'Home',
    hero: {
      headline: 'Manage projects',
      title: 'Taskboard',
      description: 'The flexible way to manage your projects, big or small.',
      links: {
        start: 'Get started'
      }
    },
    features_title: 'Core Features',
    features: {
      workspaces: {
        title: 'Dedicated Workspaces',
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
      user_assign: {
        title: 'Workspace User Management',
        desc: 'Assign roles (Admin, Member, Guest) and manage access permissions at the workspace level.'
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
        desc: 'Collaborate directly on tasks using real-time comments and mentions (@user).'
      },
      tiptap: {
        title: 'Rich Task Descriptions',
        desc: 'Use the Tiptap editor for advanced formatting (markdown, lists, tables) in your task descriptions.'
      }
    },
    pricing_title: 'Pricing Plans',
    plans: {
      free: {
        name: 'Free',
        description: 'Tailored for indie hackers.',
        features: {
          1: '1 Workspace',
          2: 'Up to 5 Boards',
          3: 'Basic Task Features'
        },
        action: 'Start Now'
      },
      team: {
        name: 'Team',
        description: 'Best suited for small teams.',
        features: {
          1: 'Unlimited Workspaces',
          2: 'Unlimited Boards',
          3: 'Up to 5 Users per Workspace',
          4: 'Advanced Filters'
        },
        action: 'Go team'
      },
      business: {
        name: 'Business',
        description: 'Ideal for larger teams and organizations.',
        features: {
          1: 'All Team Features',
          2: 'User Roles & Permissions',
          3: 'Unlimited Users per Workspace',
          4: 'Audit Logs'
        },
        action: 'Go Business'
      }
    }
  },
  dashboard: {
    title: 'Dahsboard'
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
      title: 'Create workspace',
      submit: 'Submit',
      success: {
        description: 'Workspace created successfully.'
      }
    },
    name: {
      label: 'Name',
      placeholder: 'Enter workspace name',
      required: 'Workspace name is required'
    },
    description: {
      label: 'Description',
      placeholder: 'Enter workspace description'
    },
    members: {
      title: 'Workspace members'
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
      placeholder: 'Start typing...'
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
    }
  },
  logout: {
    title: 'Logout'
  }
}
