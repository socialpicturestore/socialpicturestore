import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'classnames'
import s from './Button.module.scss'
import { Slot } from '@radix-ui/react-slot'

export type ButtonProps = {
  asChild?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'withIcon'
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
        className={clsx(
          s.button,
          s[variant],
          isWithIcon && s.isWithIcon,
          fullWidth && s.fullWidth,
          compact && s.compact,
          className
        )}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'
export { Button }
