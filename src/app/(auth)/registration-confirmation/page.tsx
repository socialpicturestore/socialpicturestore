'use client'
import { useSignUpConfirmMutation } from '@/features/auth'
import { Loader } from '@/shared/ui'
import { CongratulationsSection } from '@/widgets/congratulations-section'
import { SingUpLinkExpired } from '@/widgets/sing-up-link-expired'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = () => {
  const searchParams = useSearchParams()
  const confirmationCode = searchParams.get('code')
  const email = searchParams.get('email')
  const [signUpConfirm] = useSignUpConfirmMutation()
  const [isLoading, setIsLoading] = useState(true)
  const [isLinkExpired, setIsLinkExpired] = useState(false)

  if (!confirmationCode) {
    redirect('/')
  }

  useEffect(() => {
    const checkConfirmationCode = async () => {
      try {
        const res = await signUpConfirm({ confirmationCode })
        console.log(res)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkConfirmationCode()
  }, [])

  //При загрузке отображается loader, по завершению загрузки отображает одно из двух окон: "Успешная регистрация" или "Ссылка протухла"
  return isLoading ? (
    <Loader />
  ) : !isLinkExpired ? (
    <CongratulationsSection />
  ) : (
    <SingUpLinkExpired email={email} />
  )
}

export default page
