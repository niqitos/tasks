export default {
  app: {
    name: 'Tasks'
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'Enter your name',
      invalid: 'Invalid name'
    },
    lastname: {
      label: 'Дastname',
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
  workspaces: {
    create: {
      title: 'Create workspace',
      submit: 'Submit'
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
    success: {
      description: 'Workspace Created successfully.'
    }
  },
  task: {
    create: 'Create task',
    edit: 'Edit task',
    update: {
      button: 'Update',
      success: 'Task updated'
    },
    delete: 'Delete task',
    404: 'Task not found.',
    name: 'Name',
    description: 'Description'
  },
  logout: {
    title: 'Logout'
  }
}
