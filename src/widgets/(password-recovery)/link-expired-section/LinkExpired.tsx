'use client'

import React from 'react'
import { Button, Typography } from '@/shared/ui'
import s from './LinkExpired.module.scss'
import LinkExpiredSVG from '@/shared/assets/icons/LinkExpiredSVG'
import { usePasswordRecoveryResendMutation } from '@/features/auth'
import { useRouter, useSearchParams } from 'next/navigation'

export const LinkExpired = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [passwordResend] = usePasswordRecoveryResendMutation()
  const router = useRouter()

  const onSubmit = async () => {
    try {
      await passwordResend({
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/'}auth/password-recovery`,
        email: email || '',
      }).unwrap()
      router.push('/auth/forgot-password?redirect-from-link-expired=true')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.sectionWrapper}>
      <div className={s.contentWrapper}>
        <Typography className={s.title} variant={'h1'}>
          Email verification link expired
        </Typography>

        <Typography className={s.paragraph} variant={'regularText14'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>

        <Button className={s.resendButton} onClick={onSubmit}>
          Resend link
        </Button>
      </div>

      <LinkExpiredSVG />
    </div>
  )
}
