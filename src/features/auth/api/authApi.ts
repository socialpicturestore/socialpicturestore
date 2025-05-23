import { baseApi } from '@/shared/api/base/baseApi'
import type {
  CheckRecoveryCodeArgs,
  EmailResponse,
  GitHubSingUpArgs,
  GoogleSignUpArgs,
  GoogleSignUpResponse,
  LoginArgs,
  LoginResponse,
  MeResponse,
  NewPasswordArgs,
  NewToken,
  PasswordRecoveryArgs,
  ResendArgs,
  SignUpArgs,
  SignUpConfirmationArgs,
} from '@/features/auth/model/types/auth.types'

export const authApi = baseApi.injectEndpoints({
  endpoints: build => ({
    checkRecoveryCode: build.mutation<EmailResponse, CheckRecoveryCodeArgs>({
      query: args => ({
        url: `auth/logout`,
        method: 'POST',
        body: args,
      }),
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: args => ({
        url: `auth/logout`,
        method: 'POST',
        body: args,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const response = await queryFulfilled
          sessionStorage.setItem('access-token', response.data.accessToken)
        } catch (error) {
          console.error(error)
          throw error
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `auth/logout`,
        method: 'POST',
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled
          sessionStorage.removeItem('access-token')
          dispatch(baseApi.util.resetApiState())
        } catch (error) {
          console.error(error)
        }
      },
    }),
    me: build.query<MeResponse, void>({
      query: () => `auth/me`,
    }),
    createNewPassword: build.mutation<void, NewPasswordArgs>({
      query: args => ({
        url: `auth/new-password`,
        method: 'POST',
        body: args,
      }),
    }),
    passwordRecovery: build.mutation<void, PasswordRecoveryArgs>({
      query: args => ({
        url: `auth/password-recovery`,
        method: 'POST',
        body: args,
      }),
    }),
    passwordRecoveryResend: build.mutation<void, ResendArgs>({
      query: args => ({
        url: `auth/password-recovery-resending`,
        method: 'POST',
        body: args,
      }),
    }),
    signUp: build.mutation<void, SignUpArgs>({
      query: args => ({
        url: `auth/registration`,
        method: 'POST',
        body: args,
      }),
    }),
    signUpConfirm: build.mutation<void, SignUpConfirmationArgs>({
      query: args => ({
        url: `auth/registration-confirmation`,
        method: 'POST',
        body: args,
      }),
    }),
    signUpEmailResend: build.mutation<void, ResendArgs>({
      query: args => ({
        url: `auth/registration-email-resending`,
        method: 'POST',
        body: args,
      }),
    }),
    updateTokens: build.mutation<NewToken, void>({
      query: () => ({
        url: `auth/update-tokens`,
        method: 'POST',
      }),
    }),
    gitHubSingUp: build.query<void, GitHubSingUpArgs>({
      query: params => {
        return {
          method: 'GET',
          url: `auth/github/login`,
          params,
        }
      },
    }),
    googleSingUp: build.mutation<GoogleSignUpResponse, GoogleSignUpArgs>({
      query: args => ({
        url: `auth/google/login`,
        method: 'POST',
        body: args,
      }),
    }),
  }),
})

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useCheckRecoveryCodeMutation,
  useCreateNewPasswordMutation,
  usePasswordRecoveryMutation,
  useGitHubSingUpQuery,
  useSignUpConfirmMutation,
  useGoogleSingUpMutation,
  useUpdateTokensMutation,
  useSignUpEmailResendMutation,
  usePasswordRecoveryResendMutation,
} = authApi
