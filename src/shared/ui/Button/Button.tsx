import { ComponentPropsWithoutRef, forwardRef } from 'react'
import clsx from 'classnames'
import s from './Button.module.scss'
import { Slot } from '@radix-ui/react-slot'

export type ButtonProps = {
  asChild?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'withIcon' | 'link'
  fullWidth?: boolean
  isWithIcon?: boolean
  compact?: boolean
  className?: string
} & ComponentPropsWithoutRef<'button'>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      fullWidth = false,
      isWithIcon = false,
      asChild = false,
      compact = false,
      className,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={clsx(s.button, s[variant], fullWidth && s.fullWidth, className)}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'
export { Button }
