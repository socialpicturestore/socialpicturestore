import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(30, { message: 'Maximum number of characters 30' })
  .refine(value => /[0-9]/.test(value), {
    message: 'Password must contain at least one number (0-9)',
  })
  .refine(value => /[a-z]/.test(value), {
    message: 'Password must contain at least one char (a-z)',
  })
  .refine(value => /[A-Z]/.test(value), {
    message: 'Password must contain at least one char (A-Z)',
  })
  .refine(value => /[!\"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value), {
    message: 'Password must contain at least one char (!\\"#$%&\'()*+,\\-./:;<=>?@[\\\\\\]^_`{|}~)',
  })

export const createPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
