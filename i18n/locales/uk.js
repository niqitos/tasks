export default {
  app: {
    name: 'Задачі'
  },
  fields: {
    name: {
      label: 'Им\'я',
      placeholder: 'Введіть им\'я',
      invalid: 'Недійсне им\'я'
    },
    lastname: {
      label: 'Прізвище',
      placeholder: 'Введіть прізвище',
      invalid: 'Недійсне прізвище'
    },
    email: {
      label: 'Ел. пошта',
      placeholder: 'Введіть email',
      invalid: 'Недійсна електронна адреса'
    },
    password: {
      label: 'Пароль',
      placeholder: 'Введіть пароль',
      required: 'Пароль обов’язкове поле',
      min: 'Має бути щонайменше 8 символів'
    }
  },
  register: {
    title: 'Зареєструйте безкоштовний обліковий запис',
    already: 'Вже зареєстровані?',
    login: {
      button: 'Увійти',
      text: 'до свого аккаунту'
    },
    submit: 'Зареєструватися',
    success: {
      description: 'Акаунт успішно створено.'
    }
  },
  login: {
    title: 'Увійдіть до свого облікового запису',
    notRegistered: 'Не зареєстровані?',
    signup: {
      button: 'Створіть',
      text: 'акаунт.'
    },
    submit: 'Увійти',
    success: {
      description: 'Успішно авторизовано.'
    }
  },
  home: {
    title: 'Головна'
  },
  success: {
    title: 'Успіх!'
  },
  error: {
    title: 'Помилка!',
    500: 'Щось пішло не так 😒'
  },
  workspaces: {
    create: {
      title: 'Створити робочу область',
      submit: 'Створити'
    },
    name: {
      label: 'Назва',
      placeholder: 'Введіть назву робочої області',
      required: 'Назва робочої області обов’язкова'
    },
    description: {
      label: 'Опис',
      placeholder: 'Введіть опис робочої області'
    },
    success: {
      description: 'Робочу область успішно створено.'
    }
  },
  task: {
    create: 'Створити задачу',
    edit: 'Редагувати задачу',
    update: {
      button: 'Зберегти',
      success: 'Задачу оновлено'
    },
    delete: 'Видалити задачу',
    404: 'Задачу не знайдено.',
    name: 'Назва',
    description: 'Опис'
  },
  logout: {
    title: 'Вийти'
  }
}
