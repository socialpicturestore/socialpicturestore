import { z } from 'zod'
import { createPasswordSchema } from '@/widgets/password-recovery/create-new-password-section/schema'

export type CreatePasswordFormData = z.infer<typeof createPasswordSchema>

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
