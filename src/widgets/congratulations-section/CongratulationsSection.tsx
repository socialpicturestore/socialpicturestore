'use client'
import { RegistrationConfirmationSvg } from '@/shared/assets/icons'
import React, { useEffect } from 'react'
import s from './CongratulationsSection.module.scss'
import { Button, Typography } from '@/shared/ui'
import { useSignUpConfirmMutation } from '@/features/auth'

export const CongratulationsSection = ({ confirmationCode }: { confirmationCode: string }) => {
  const [signUpConfirm] = useSignUpConfirmMutation()

  useEffect(() => {
    const checkConfirmationCode = async () => {
      try {
        const res = await signUpConfirm({ confirmationCode })
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }

    checkConfirmationCode()
  }, [])

  return (
    <div className={s.container}>
      <Typography variant="h1" as="h1">
        Congratulations!
      </Typography>
      <Typography variant="regularText16">Your email has been confirmed</Typography>
      <Button>Sign In</Button>
      <RegistrationConfirmationSvg />
    </div>
  )
}
