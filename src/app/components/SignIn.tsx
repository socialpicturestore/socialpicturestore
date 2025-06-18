// app/components/SignIn.tsx
'use client'

import { signIn } from 'next-auth/react'
import styles from './SignIn.module.scss'

export default function SignIn() {
  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' }).catch(error => console.error('SignIn error:', error))
  }
  return (
    <div className={styles.authButtons}>
      <button 
        onClick={() => handleSignIn('google')} 
        className={styles.googleButton} 
        type="button"
      >
        Sign in with Google
      </button>

      <button 
        onClick={() => handleSignIn('github')} 
        className={styles.githubButton} 
        type="button"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}
