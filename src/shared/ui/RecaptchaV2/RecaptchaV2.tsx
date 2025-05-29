'use client'

import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  onChange: (token: string | null) => void
}

export const RecaptchaV2 = ({ onChange }: Props) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  return <ReCAPTCHA theme={'dark'} sitekey={siteKey} onChange={onChange} />
}
