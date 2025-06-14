import { RegistrationConfirmationSvg } from '@/shared/assets/icons'
import React from 'react'
import s from './CongratulationsSection.module.scss'
import { Button, Typography } from '@/shared/ui'

export const CongratulationsSection = () => {
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
