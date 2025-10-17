export default {
  app: {
    name: 'Задачі'
  },
  cancel: 'Відмінити',
  fields: {
    name: {
      label: 'Ім’я',
      placeholder: 'Введіть ім’я',
      required: 'Ім’я обов’язкове',
      invalid: 'Недійсне им’я'
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
  user: {
    edit: {
      button: 'Користувач',
      title: 'Редагувати користувача',
      submit: 'Зберегти'
    },
    update: {
      success: {
        description: 'Користувача успішно оновлено.'
      }
    }
  },
  workspaces: {
    create: {
      title: 'Створити робочу область',
      submit: 'Створити',
      success: {
        description: 'Робочу область успішно створено.'
      }
    },
    name: {
      label: 'Назва',
      placeholder: 'Введіть назву робочої області',
      required: 'Назва робочої області обов’язкова'
    },
    description: {
      label: 'Опис',
      placeholder: 'Введіть опис робочої області'
    }
  },
  board: {
    default: {
      1: {
        name: 'Зробити',
        description: 'Задачі, що очікують на початок'
      },
      2: {
        name: 'В процесі',
        description: 'Задачі, що наразі виконуються'
      },
      3: {
        name: 'Виконано',
        description: 'Завершені задачі'
      }
    },
    create: {
      placeholder: 'Створити дошку',
      success: {
        description: 'Дошку успішно створено'
      }
    },
    delete: {
      button: 'Видалити дошку',
      title: 'Ви впевнені, що хочете видалити цю дошку?',
      description: 'Дошка буде видалена разом із усіма завданнями.',
      submit: 'Так, видалити дошку',
      success: {
        description: 'Дошку успішно видалено'
      }
    }
  },
  task: {
    create: {
      placeholder: 'Створити задачу',
      success: {
        description: 'Задачу успішно створено'
      }
    },
    edit: 'Редагувати задачу',
    update: {
      button: 'Зберегти',
      success: 'Задачу оновлено'
    },
    delete: {
      button: 'Видалити задачу',
      title: 'Ви впевнені, що хочете видалити цю задачу?',
      description: 'Ви не зможете її відновити.',
      submit: 'Так, видалити задачу',
      success: {
        description: 'Задачу успішно видалено'
      }
    },
    404: 'Задачу не знайдено.',
    createdBy: 'Автор',
    createdAt: 'Дата створення',
    assignees: 'Ще немає виконавців | Виконавець | Виконавці | Виконавці',
    assign: {
      button: 'Призначити виконавця',
      search: 'Пошук користувача...'
    },
    name: {
      label: 'Назва',
      required: 'Назва обов’язкова'
    },
    description: {
      label: 'Опис',
      placeholder: 'Почніть друкувати...'
    },
    files: {
      add: {
        label: 'Додати файли'
      },
      label: 'Додані файли'
    }
  },
  logout: {
    title: 'Вийти'
  }
}
