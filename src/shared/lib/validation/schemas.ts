import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email('Введите корректный email'),
  recaptcha: z.string().nonempty('Подтвердите, что вы не робот'),
})
