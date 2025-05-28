'use client'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/shared/assets/icons'
import { Button, Card, Typography } from '@/shared/ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import s from './SignUpSection.module.scss'
import { useSignUpMutation } from '@/features/auth'
import { ControlledInput } from '@/shared/ui/ControlledInput'

export const SignUpSection = () => {
  // const [isChecked, setIsChecked] = useState(false)
  const [registration] = useSignUpMutation()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    // mode: 'onChange',
    // reValidateMode: 'onSubmit',
    // resolver: zodResolver(FeedbackFormScheme('feedback')),
  })

  const formHandler = handleSubmit(async data => {
    console.log(data)
    try {
      const res = registration({
        userName: data.userName,
        email: data.email,
        password: data.password,
        baseUrl: 'http://localhost:3000/registration-confirmation',
      }).unwrap()
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <Card className={s.container}>
      <Typography variant="h1" as="h1">
        Sign Up
      </Typography>
      <div className={s.socialMedia}>
        <GithubSvgrepoCom31 />
        <GoogleSvgrepoCom1 />
      </div>
      <form onSubmit={formHandler}>
        <ControlledInput label="Username" control={control} name="userName" />
        <ControlledInput label="Email" control={control} name="email" />
        <ControlledInput label="Password" variant="password" control={control} name="password" />
        <ControlledInput
          label="Password confirmation"
          variant="password"
          control={control}
          name="passwordConfirmation"
        />
        {/* <Checkbox checked={isChecked} onChange={(checked: boolean) => setIsChecked(checked)}>
          I agree to the Terms of Service and Privacy Policy
        </Checkbox> */}
        <Button>Sign Up</Button>
      </form>
    </Card>
  )
}
