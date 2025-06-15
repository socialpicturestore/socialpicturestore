import { z } from 'zod'
import { createPasswordSchema } from '@/widgets/password-recovery/create-new-password-section/schema'
import { createForgotPasswordSchema } from '@/widgets/password-recovery/forgot-password-section/schema'

export type CreatePasswordFormData = z.infer<typeof createPasswordSchema>

export type ForgotPasswordFormData = z.infer<typeof createForgotPasswordSchema>

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
