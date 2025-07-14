import {
  checkedScheme,
  emailScheme,
  passwordScheme,
  userNameScheme,
} from '@/shared/validation/validation'
import { z } from 'zod'
import { validation } from './validation.errors'

export const SignUpScheme = () => {
  return z
    .object({
      userName: userNameScheme(),
      email: emailScheme(),
      password: passwordScheme(),
      passwordConfirmation: z.string().trim(),
      checked: checkedScheme(),
    })
    .refine(val => val.password === val.passwordConfirmation, {
      message: validation.sign_up.password.passwordsMatch,
      path: ['passwordConfirmation'],
    })
    .refine(val => val.checked === true, {
      message: validation.sign_up.agreeToTerms,
      path: ['checked'],
    })
}
