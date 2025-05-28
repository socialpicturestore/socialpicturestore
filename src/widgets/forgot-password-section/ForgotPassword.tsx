import React from 'react'
import { Button, Card, Input, Recaptcha, Typography } from '@/shared/ui'
import s from './ForgotPassword.module.scss'
import Link from 'next/link'

export const ForgotPassword = () => {
  return (
    <Card>
      <div className={s.container}>
        <Typography variant={'h1'}>Forgot Passord</Typography>

        <Input label={'Email'}></Input>

        <Typography className={s.paragraph} variant={'regularText14'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>

        <Button>Send Link</Button>

        <Button asChild variant={'text'}>
          <Link href={'/'}>Back to Sign In</Link>
        </Button>

        <Recaptcha state={'default'} onChange={() => console.log()}></Recaptcha>
      </div>
    </Card>
  )
}
