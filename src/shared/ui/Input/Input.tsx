'use client'

import { EyeOffOutline, EyeOutline, Search } from '@/shared/assets/icons'
import { Typography } from '@/shared/ui'
import React, { useState, forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import clsx from 'classnames'

import styles from './Input.module.scss'

type Variant = 'text' | 'password' | 'email' | 'search'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  error?: string
  variant?: Variant
  startIcon?: ReactNode
  endIcon?: ReactNode
  onEnter?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    className,
    startIcon,
    endIcon,
    variant = 'text',
    onEnter,
    onKeyDown,
    disabled,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = rest.id ?? generatedId

  const [showPassword, setShowPassword] = useState(false)

  const isPassword = variant === 'password'
  const isSearch = variant === 'search'
  const htmlType = isPassword ? (showPassword ? 'text' : 'password') : variant

  const wrapperClasses = clsx(styles.inputWrapper, {
    [styles.error]: !!error,
    [styles.inputDisabled]: disabled,
  })

  const inputClasses = clsx(
    styles.inputField,
    {
      [styles.withStartIcon]: Boolean(startIcon) || isSearch,
      [styles.withEndIcon]: Boolean(endIcon) || isPassword,
      [styles.inputError]: !!error,
      [styles.inputDisabled]: disabled,
    },
    className
  )

  const handleTogglePassword = () => setShowPassword(prev => !prev)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter?.()
    }
    onKeyDown?.(e)
  }

  return (
    <div className={wrapperClasses}>
      {label && (
        <Typography
          as="label"
          htmlFor={inputId}
          variant="regularText14"
          className={styles.inputLabel}
        >
          {label}
        </Typography>
      )}

      <div className={styles.inputInnerWrapper}>
        {isSearch && (
          <div className={clsx(styles.inputIcon, styles.startIcon)}>{startIcon ?? <Search />}</div>
        )}

        <input
          id={inputId}
          ref={ref}
          type={htmlType}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        {isPassword ? (
          <button
            type="button"
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            disabled={disabled}
            className={clsx(styles.inputIcon, styles.endIcon)}
            onClick={handleTogglePassword}
          >
            {showPassword ? <EyeOffOutline /> : <EyeOutline />}
          </button>
        ) : (
          endIcon && <div className={clsx(styles.inputIcon, styles.endIcon)}>{endIcon}</div>
        )}
      </div>

      {error && (
        <Typography
          as="span"
          id={`${inputId}-error`}
          role="alert"
          variant="regularText14"
          className={styles.inputErrorMessage}
        >
          {error}
        </Typography>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
