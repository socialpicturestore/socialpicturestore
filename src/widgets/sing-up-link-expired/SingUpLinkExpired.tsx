import React from 'react'
import s from './SingUpLinkExpired.module.scss'
import { Button, Typography } from '@/shared/ui'
import { LinkExpiredIcon } from '@/shared/assets/icons'
import { useSignUpEmailResendMutation } from '@/features/auth'
import { ControlledInput } from '@/shared/ui/ControlledInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailScheme } from '@/shared/validation/validation'
import { z } from 'zod'

export const SingUpLinkExpired = ({ email }: { email: string | null }) => {
  const [resendRecoveryCode] = useSignUpEmailResendMutation()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: email || '',
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(
      z.object({
        email: emailScheme(),
      })
    ),
  })

  const handleResendRecoveryCode = handleSubmit(async data => {
    try {
      const res = await resendRecoveryCode({
        email: data.email,
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/',
      })
      console.log(res)
    } catch (err: any) {
      console.log(err?.data?.messages?.[0]?.message || '')
      alert(err?.data?.messages?.[0]?.message || '')
    }
  })

  return (
    <div className={s.container}>
      <Typography variant="h1" as="h1">
        Email verification link expired
      </Typography>
      <Typography variant="regularText16">
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <form className={s.inputContainer} onSubmit={handleResendRecoveryCode}>
        <ControlledInput control={control} name="email" label="Email" placeholder="Epam@epam.com" />
        <Button type="submit">Resend verification link</Button>
      </form>
      <LinkExpiredIcon />
    </div>
  )
}
