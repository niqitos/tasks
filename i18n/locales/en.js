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
    title: 'Home'
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
        label: 'Add files',
        max: 'max.'
      },
      delete: {
        success: {
          description: 'Task file deleted successfully'
        }
      },
      label: 'Added files'
    }
  },
  logout: {
    title: 'Logout'
  }
}
