'use client'
import { EyeOffOutline, EyeOutline } from '@/shared/assets/icons'
import { Typography } from '@/shared/ui/Typography'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef, type InputHTMLAttributes, type ReactNode, useState } from 'react'
import clsx from 'classnames'

import styles from './Input.module.scss'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  asChild?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, className, asChild = false, startIcon, endIcon, type = 'text', ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'input'
    const [showPassword, setShowPassword] = useState(false)

    const isPasswordType = type === 'password'
    const inputType = isPasswordType && showPassword ? 'text' : type

    const inputClassName = clsx(
      styles.inputField,
      {
        [styles.withStartIcon]: startIcon,
        [styles.withEndIcon]: endIcon,
        [styles.inputError]: error,
        [styles.inputDisabled]: props.disabled,
      },
      className
    )

    const handleTogglePassword = () => {
      setShowPassword(prev => !prev)
    }

    return (
      <div className={styles.inputWrapper}>
        {label && (
          <Typography as="label" variant="regularText14" className={styles.inputLabel}>
            {label}
          </Typography>
        )}
        <div className={styles.inputInnerWrapper}>
          {startIcon && <div className={clsx(styles.inputIcon, styles.startIcon)}>{startIcon}</div>}
          <Comp {...props} ref={ref} type={inputType} className={inputClassName} />
          {isPasswordType ? (
            <div className={clsx(styles.inputIcon, styles.endIcon)} onClick={handleTogglePassword}>
              {showPassword ? <EyeOffOutline /> : <EyeOutline />}
            </div>
          ) : endIcon ? (
            <div className={clsx(styles.inputIcon, styles.endIcon)}>{endIcon}</div>
          ) : null}
        </div>
        {error && (
          <Typography as="p" variant="regularText14" className={styles.inputErrorMessage}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
