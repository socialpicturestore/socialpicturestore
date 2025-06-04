'use client'

import React from 'react'
import { Button, Card, Input, RecaptchaV2, Typography } from '@/shared/ui'
import s from './ForgotPassword.module.scss'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema } from '@/shared/lib/validation/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePasswordRecoveryMutation } from '@/features/auth'

type FormData = z.infer<typeof forgotPasswordSchema>

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const [triggerRecovery, { isSuccess }] = usePasswordRecoveryMutation()

  const onSubmit = async (data: FormData) => {
    try {
      await triggerRecovery({
        email: data.email,
        recaptcha: data.recaptcha,
        baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
      }).unwrap()
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.forgotTitle} variant={'h1'}>
          Forgot Password
        </Typography>
        <div className={s.inputEmail}>
          <Input
            {...register('email')}
            error={errors.email?.message}
            label={'Email'}
            placeholder={'example@example.com'}
          ></Input>
        </div>
        <Typography className={s.paragraph} variant={'regularText14'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>

        {isSuccess && (
          <Typography variant={'regularText14'}>
            The link has been sent by email. If you don’t receive an email send link again
          </Typography>
        )}

        <Button type="submit" className={s.sendButton}>
          Send Link
        </Button>

        <Button asChild variant={'text'} className={s.backButton}>
          <Link href={'/'}>Back to Sign In</Link>
        </Button>

        <div className={s.recaptcha}>
          <RecaptchaV2 onChange={token => setValue('recaptcha', token || '')} />
          {errors.recaptcha && (
            <Typography variant={'small'} as={'span'}>
              {errors.recaptcha.message}
            </Typography>
          )}
        </div>
      </form>
    </Card>
  )
}
