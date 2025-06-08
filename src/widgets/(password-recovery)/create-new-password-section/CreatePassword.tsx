'use client'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Card, Input, Typography } from '@/shared/ui'
import s from './CreatePassword.module.scss'
import { useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation, useCheckRecoveryCodeMutation } from '@/features/auth'
import { useSearchParams } from 'next/navigation'
import {
  CreatePasswordFormData,
  ErrorMessage,
} from '@/widgets/(password-recovery)/types/recovery.types'

export const CreatePassword = () => {
  const searchParams = useSearchParams()

  const code = searchParams.get('code')
  const email = searchParams.get('email')
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreatePasswordFormData>()
  const passwordWatcher = watch('password')
  const [createNewPassword] = useCreateNewPasswordMutation()
  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()

  useLayoutEffect(() => {
    const checkCode = async () => {
      try {
        await checkRecoveryCode({
          recoveryCode: code || '',
        }).unwrap()
      } catch (e) {
        router.push(`/auth/verification-link-expired?email=${email}`)
      } finally {
        setIsChecking(false)
      }
    }
    checkCode()
  }, [])

  const onSubmit = async (data: any) => {
    try {
      await createNewPassword({
        newPassword: data.password,
        recoveryCode: code || '',
      }).unwrap()
      setErrorMessage(null)
      router.push('sign-in')
    } catch (error) {
      setErrorMessage((error as ErrorMessage).data.messages[0].message)
    }
  }

  if (isChecking) {
    return null
  }

  return (
    <Card>
      <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={s.title} variant={'h1'}>
          Create New Password
        </Typography>
        <div className={s.inputWrapper}>
          <Input
            variant={'password'}
            {...register('password')}
            error={errorMessage || undefined}
            label={'New Password'}
            placeholder={'Enter new password'}
          ></Input>

          <Input
            variant={'password'}
            {...register('confirmPassword', {
              validate: value => value === passwordWatcher || 'The passwords must match',
            })}
            error={errors.confirmPassword?.message || undefined}
            label={'Password Confirmation'}
            placeholder={'Confirm new password'}
          ></Input>
        </div>
        <Typography className={s.paragraph} variant={'regularText14'}>
          Your password must be between 6 and 20 characters
        </Typography>

        <Button type="submit" className={s.sendButton}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}
