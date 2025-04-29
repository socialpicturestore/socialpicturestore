import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import clsx from 'classnames'
import s from './Button.module.scss'
import { Slot } from '@radix-ui/react-slot'

export type ButtonProps = {
  asChild?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'withIcon'
  fullWidth?: boolean
  withIcon?: boolean
  className?: string
  icon?: ReactNode
} & ComponentPropsWithoutRef<'button'>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth = false, asChild = false, className, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        ref={ref}
        className={clsx(
          s.button,
          s[variant],
          s['withIcon'] && s.icon,
          fullWidth && s.fullWidth,
          className
        )}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'
export { Button }
