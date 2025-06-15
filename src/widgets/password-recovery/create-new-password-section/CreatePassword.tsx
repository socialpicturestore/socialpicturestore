'use client'
import { useRouter } from 'next/navigation'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Card, Input, Typography } from '@/shared/ui'
import s from './CreatePassword.module.scss'
import { useForm } from 'react-hook-form'

import { useCreateNewPasswordMutation, useCheckRecoveryCodeMutation } from '@/features/auth'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPasswordSchema } from '@/widgets/password-recovery/create-new-password-section/schema'
import { CreatePasswordFormData, ErrorMessage } from '@/widgets/password-recovery/types'
import { PATHS } from '@/shared/const/path/paths'

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
    formState: { errors },
  } = useForm<CreatePasswordFormData>({ resolver: zodResolver(createPasswordSchema) })
  const [createNewPassword] = useCreateNewPasswordMutation()
  const [checkRecoveryCode] = useCheckRecoveryCodeMutation()

  useLayoutEffect(() => {
    const checkCode = async () => {
      try {
        await checkRecoveryCode({
          recoveryCode: code || '',
        }).unwrap()
      } catch (e) {
        router.push(`${PATHS.AUTH.VERIFICATION_LINK_EXPIRED}?email=${email}`)
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
      router.push(`${PATHS.AUTH.LOGIN}`)
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
            error={errorMessage || errors.password?.message}
            label={'New Password'}
            placeholder={'Enter new password'}
          ></Input>

          <Input
            variant={'password'}
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
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
