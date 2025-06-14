type MessagesType = {
  field: string
  message: string
}

type DataError = {
  error: string
  statusCode: number
  messages: MessagesType[]
}

export type ErrorMessage = {
  data: DataError
  status: number
}

export type ForgotPasswordFormData = {
  email: string
  recaptcha: string
  baseUrl: string
}

export type CreatePasswordFormData = {
  password: string
  confirmPassword: string
}
