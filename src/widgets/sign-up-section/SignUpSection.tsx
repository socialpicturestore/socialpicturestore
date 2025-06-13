'use client'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets/icons'
import { Button, Card, Typography } from '@/shared/ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './SignUpSection.module.scss'
import { useSignUpMutation } from '@/features/auth'
import { ControlledInput } from '@/shared/ui/ControlledInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpScheme } from '@/shared/validation/feedback-scheme-creator'
import Link from 'next/link'
import { ControlledCheckbox } from '@/shared/ui/controlled-checkbox'
import Modal from '@/shared/ui/modal/Modal'

export const SignUpSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [registration] = useSignUpMutation()

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      checked: false,
    },
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(SignUpScheme()),
  })

  const formHandler = handleSubmit(async data => {
    try {
      const res = await registration({
        userName: data.userName,
        email: data.email,
        password: data.password,
        baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/registration-confirmation`,
      }).unwrap()
      console.log(res)
      setIsModalOpen(true)
    } catch (err: any) {
      console.log(err?.data?.messages?.[0]?.message || '')
      alert(err?.data?.messages?.[0]?.message || '')
    }
  })

  const email = watch('email')

  return (
    <Card>
      <div className={s.container}>
        <Typography variant="h1" as="h1">
          Sign Up
        </Typography>
        <div className={s.socialMedia}>
          <GoogleSvgrepoCom1 />
          <GithubSvgrepoCom31 />
        </div>
        <form onSubmit={formHandler} className={s.form}>
          <ControlledInput
            placeholder="Username"
            label="Username"
            control={control}
            name="userName"
          />
          <ControlledInput placeholder="Email" label="Email" control={control} name="email" />
          <ControlledInput
            placeholder="******************"
            label="Password"
            variant="password"
            control={control}
            name="password"
          />
          <ControlledInput
            placeholder="******************"
            label="Password confirmation"
            variant="password"
            control={control}
            name="passwordConfirmation"
          />
          <ControlledCheckbox control={control} name="checked">
            <Typography variant="regularText12">
              I agree to the{' '}
              <Button variant="link" asChild>
                <Typography as={Link} variant="regularText12" href="/" target="blank">
                  Terms of Service
                </Typography>
              </Button>{' '}
              and{' '}
              <Button variant="link" asChild>
                <Typography as={Link} variant="regularText12" href="/" target="blank">
                  Privacy Policy
                </Typography>
              </Button>
            </Typography>
          </ControlledCheckbox>
          <Button>Sign Up</Button>
        </form>
        <Typography variant="regularText16">Do you have an account?</Typography>
        <Button variant="text" fullWidth>
          Sign In
        </Button>
      </div>

      <Modal
        modalTitle={'Email Sent'}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeButton={true}
      >
        <Typography variant={'regularText16'}>
          We have sent a link to confirm your email to {email}
        </Typography>

        <div className={s.buttonContainer}>
          <Button onClick={() => setIsModalOpen(false)} className={s.modalButton}>
            OK
          </Button>
        </div>
      </Modal>
    </Card>
  )
}
