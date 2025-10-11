export default {
  app: {
    name: 'Задачи'
  },
  cancel: 'Отменить',
  fields: {
    name: {
      label: 'Имя',
      placeholder: 'Введите имя',
      required: 'Имя обязательно',
      invalid: 'Неверное имя'
    },
    lastname: {
      label: 'Фамилия',
      placeholder: 'Введите фамилия',
      invalid: 'Неверное фамилия'
    },
    email: {
      label: 'Эл. почта',
      placeholder: 'Введите email',
      invalid: 'Неверный адрес электронной почты'
    },
    password: {
      label: 'Пароль',
      placeholder: 'Введите пароль',
      required: 'Пароль обязательное поле',
      min: 'Должно быть не менее 8 символов.'
    }
  },
  register: {
    title: 'Зарегистрируйте бесплатную учетную запись',
    already: 'Уже зарегистрированы?',
    login: {
      button: 'Войти',
      text: 'в свой аккаунт'
    },
    submit: 'Зарегистрироваться',
    success: {
      description: 'Аккаунт успешно создан.'
    }
  },
  login: {
    title: 'Войдите в свою учетную запись',
    notRegistered: 'Не зарегистрированы?',
    signup: {
      button: 'Создайте',
      text: 'аккаунт.'
    },
    submit: 'Войти',
    success: {
      description: 'Авторизация выполнена успешно.'
    }
  },
  home: {
    title: 'Главная'
  },
  success: {
    title: 'Успех!'
  },
  error: {
    title: 'Ошибка!',
    500: 'Что-то пошло не так 😒'
  },
  user: {
    edit: {
      button: 'Пользователь',
      title: 'Редактировать пользователя',
      submit: 'Сохранить'
    },
    update: {
      success: {
        description: 'Пользователь успешно обновлен.'
      }
    }
  },
  workspaces: {
    create: {
      title: 'Создать рабочую область',
      submit: 'Создать',
      success: {
        description: 'Рабочая область успешно создан.'
      }
    },
    name: {
      label: 'Название',
      placeholder: 'Введите название рабочей области',
      required: 'Название рабочей области обязательно'
    },
    description: {
      label: 'Описание',
      placeholder: 'Введите описание рабочей области'
    }
  },
  board: {
    default: {
      1: {
        name: 'Сделать',
        description: 'Задачи, ожидающие начала'
      },
      2: {
        name: 'В процессе',
        description: 'Задачи, которые в настоящее время выполняются'
      },
      3: {
        name: 'Выполнено',
        description: 'Выполненные задачи'
      }
    },
    create: {
      placeholder: 'Создать доску',
      success: {
        description: 'Доска успешно создана.'
      }
    },
    delete: {
      button: 'Удалить доску',
      title: 'Вы уверены, что хотите удалить эту доску?',
      description: 'Доска будет удалена вместе со всеми задачами.',
      submit: 'Да, удалить доску',
      success: {
        description: 'Доска успешно удалена.'
      }
    }
  },
  task: {
    create: {
      placeholder: 'Создать задачу',
      success: {
        description: 'Задача успешно создана.'
      }
    },
    edit: 'Редактировать задачу',
    update: {
      button: 'Сохранить',
      success: 'Задача обновлена'
    },
    delete: {
      button: 'Удалить задачу',
      title: 'Вы уверены, что хотите удалить эту задачу?',
      description: 'Вы не сможете ее восстановить.',
      submit: 'Да, удалить задачу',
      success: {
        description: 'Задача успешно удалена.'
      }
    },
    404: 'Задача не найдена.',
    createdBy: 'Автор',
    name: {
      label: 'Название',
      required: 'Название обязательно'
    },
    description: {
      label: 'Описание'
    }
  },
  logout: {
    title: 'Выйти'
  }
}
