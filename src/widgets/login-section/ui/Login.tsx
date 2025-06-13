'use client'

import { useLoginMutation } from '@/features/auth'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets/icons'
import { Button, Card, Input, Typography } from '@/shared/ui'
import { type LoginFormValues, loginSchema } from '@/widgets/login-section/model/validation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './Login.module.scss'

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const router = useRouter()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      //TODO когда будет готова страница профиля, то нужно добавить проверку "если пользователь существует", то редирект на старницу прфоиля, если "пользователь не существует" - редирект на старницу создания профиля

      await login(data).unwrap()

      router.push('/')
    } catch (err: any) {
      setError('password', { message: 'Некорректный Email или пароль. Попробуйте снова.' })
    }
  }

  return (
    <Card className={s.container}>
      <Typography variant="h1" className={s.title}>
        Sign In
      </Typography>

      <div className={s.socialMedia}>
        <GithubSvgrepoCom31 width={36} height={36} />
        <GoogleSvgrepoCom1 width={36} height={36} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={s.inputWrapper}>
          <Input
            {...register('email')}
            label="Email"
            placeholder="Write your Email..."
            error={errors.email?.message}
            autoComplete="email"
            variant="text"
          />

          <Input
            {...register('password')}
            variant="password"
            label="Password"
            placeholder="*******"
            error={errors.password?.message}
            autoComplete="current-password"
          />
        </div>

        {errors.root?.message && (
          <Typography as="span" variant="regularText14" className={s.fieldError}>
            {errors.root.message}
          </Typography>
        )}

        <div className={s.actions}>
          <Typography as="p" variant="regularText14" className={s.forgotPassword}>
            Forgot Password
          </Typography>
          <Button
            type="submit"
            variant="primary"
            fullWidth={true}
            disabled={isSubmitting || isLoading}
            className={s.btnSignIn}
          >
            {isSubmitting || isLoading ? 'Загрузка...' : 'Sign In'}
          </Button>
          <Typography as="p" variant="regularText16" className={s.createAccountText}>
            Don’t have an account?
          </Typography>
          <Button variant="text" fullWidth={true} asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </form>
    </Card>
  )
}
