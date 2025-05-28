// request args

export type CheckRecoveryCodeArgs = {
  recoveryCode: string
}

export type LoginArgs = {
  email: string
  password: string
}

export type NewPasswordArgs = {
  newPassword: string
  recoveryCode: string
}

export type ResendArgs = {
  email: string
  baseUrl: string
}

export type PasswordRecoveryArgs = ResendArgs & {
  recaptcha: string
}

export type SignUpArgs = {
  userName: string
  email: string
  password: string
  baseUrl: string
}

export type SignUpConfirmationArgs = {
  confirmationCode: string
}

export type GoogleSignUpArgs = {
  redirectUrl: string
  code: string
}

export type GitHubSingUpArgs = {
  redirectUrl: string
}

// response

export type EmailResponse = {
  email: string
}

export type LoginResponse = {
  accessToken: string
}

export type MeResponse = {
  userId: string
  userName: string
  email: string
  isBlocked: boolean
}

export type NewToken = {
  accessToken: string
}

export type GoogleSignUpResponse = {
  accessToken: string
  email: string
}
