export default {
  app: {
    name: 'Задачи'
  },
  fields: {
    name: {
      label: 'Имя',
      placeholder: 'Введите имя',
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
  workspaces: {
    create: {
      title: 'Создать рабочую область',
      submit: 'Создать'
    },
    name: {
      label: 'Название',
      placeholder: 'Введите название рабочей области',
      required: 'Название рабочей области обязательно'
    },
    description: {
      label: 'Описание',
      placeholder: 'Введите описание рабочей области'
    },
    success: {
      description: 'Рабочая область успешно создан.'
    }
  },
  task: {
    create: 'Создать задачу',
    edit: 'Редактировать задачу',
    update: {
      button: 'Сохранить',
      success: 'Задача обновлена'
    },
    delete: 'Удалить задачу',
    404: 'Задача не найдена.',
    name: 'Название',
    description: 'Описание'
  },
  logout: {
    title: 'Выйти'
  }
}
