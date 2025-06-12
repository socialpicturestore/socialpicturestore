'use client'

import React, { useEffect, useState } from 'react'
import { Button, Card, Input, RecaptchaV2, Typography } from '@/shared/ui'
import s from './ForgotPassword.module.scss'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { usePasswordRecoveryMutation } from '@/features/auth'
import Modal from '@/shared/ui/Modal/Modal'
import {
  ErrorMessage,
  ForgotPasswordFormData,
} from '@/widgets/(password-recovery)/types/recovery.types'
import { useSearchParams } from 'next/navigation'

export const ForgotPassword = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect-from-link-expired')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { register, handleSubmit, setValue, reset } = useForm<ForgotPasswordFormData>()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [triggerRecovery, { isSuccess }] = usePasswordRecoveryMutation()

  useEffect(() => {
    if (redirect) {
      setIsModalOpen(true)
    }
  }, [])

  const onSubmit = async (data: any) => {
    try {
      await triggerRecovery({
        email: data.email,
        recaptcha: data.recaptcha,
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/'}auth/password-recovery`,
      }).unwrap()
      setErrorMessage(null)
      reset()
    } catch (error) {
      setErrorMessage((error as ErrorMessage).data.messages[0].message)
    }
  }

  const handleCaptchaVerified = (token: string | null) => {
    setValue('recaptcha', token || '')
  }

  return (
    <Card>
      <Modal
        modalTitle={'Email Sent'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeButton={true}
        separator={true}
      >
        <Typography variant={'regularText16'}>
          We have sent a link to confirm your email to epam@epam.com
        </Typography>

        <div className={s.buttonContainer}>
          <Button onClick={() => setIsModalOpen(false)} className={s.modalButton}>
            OK
          </Button>
        </div>
      </Modal>
      <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.forgotTitle} variant={'h1'}>
          Forgot Password
        </Typography>
        <div className={s.inputEmail}>
          <Input
            {...register('email')}
            error={errorMessage || undefined}
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
          {isSuccess ? 'Send Link Again' : 'Send Link'}
        </Button>

        <Button asChild variant={'text'} className={s.backButton}>
          <Link href={'/sign-in'}>Back to Sign In</Link>
        </Button>

        {!isSuccess && !redirect && (
          <div className={s.recaptcha}>
            <RecaptchaV2 onChange={handleCaptchaVerified} />
          </div>
        )}
      </form>
    </Card>
  )
}
