'use client'

import React from 'react'
import { Button, Typography } from '@/shared/ui'
import s from './LinkExpired.module.scss'
import LinkExpiredSVG from '@/shared/assets/icons/LinkExpiredSVG'
import { usePasswordRecoveryResendMutation } from '@/features/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { PATHS } from '@/shared/const/path/paths'

export const LinkExpired = () => {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [passwordResend] = usePasswordRecoveryResendMutation()
  const router = useRouter()

  const onSubmit = async () => {
    try {
      await passwordResend({
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/'}${PATHS.AUTH.PASSWORD_RECOVERY}`,
        email: email || '',
      }).unwrap()
      router.push(`${PATHS.AUTH.FORGOT_PASSWORD}?redirect-from-link-expired=true&email=${email}`)
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
