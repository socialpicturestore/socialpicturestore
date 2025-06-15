import { z } from 'zod'

export const createForgotPasswordSchema = z.object({
  email: z.string().email('Incorrect Email. Example: example@example.com'),
  recaptcha: z.string(),
})
