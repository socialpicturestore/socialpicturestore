export const validation = {
  sign_up: {
    user_name: {
      min_length: 'Минимальное количество символов 6',
      max_length: 'Максимальное количество символов 30',
      regex: 'Username может содержать: 0-9; A-Z; a-z; _ ; -',
    },
    agreeToTerms: 'Необходимо соглашение с пользовательским соглашением',
    email: 'Email должен соответствовать формату example@example.com',
    noWhiteSpace: 'Использование пробелов запрещено',
    password: {
      min_length: 'Минимальное количество символов 6',
      max_length: 'Максимальное количество символов 30',
      regex:
        'Username может содержать: 0-9; A-Z; a-z; ! " # $ % & ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ { | } ~',
      passwordsMatch: 'Пароли должны совпадать',
    },
  },
}
