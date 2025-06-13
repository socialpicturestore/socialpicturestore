import { z } from 'zod'
import { validation } from './validation.errors'

export const userNameScheme = () =>
  z
    .string()
    .trim()
    .min(6, { message: validation.sign_up.user_name.min_length })
    .max(30, { message: validation.sign_up.user_name.max_length })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: validation.sign_up.user_name.regex })

export const checkedScheme = () =>
  z
    .boolean()
    .default(false)
    .refine(value => value === true, {
      message: validation.sign_up.agreeToTerms,
    })

export const emailScheme = () =>
  z
    .string()
    .email({
      message: validation.sign_up.email,
    })
    .toLowerCase()

export const passwordScheme = () =>
  z
    .string()
    .trim()
    .regex(/^\S*$/, { message: validation.sign_up.noWhiteSpace })
    .min(6, { message: validation.sign_up.password.min_length })
    .max(20, { message: validation.sign_up.password.max_length })
    .refine(value => /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/.test(value), {
      message: validation.sign_up.password.regex,
    })
