import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef, ReactNode } from 'react'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import clsx from 'classnames'
import s from './Checkbox.module.scss'
import { CheckmarkOutline } from '@/shared/assets/icons'
import { Typography } from '@/shared/ui'

export type CheckboxProps = {
  checked: boolean
  className?: string
  disabled?: boolean
  small?: boolean
  id?: string
  children?: ReactNode
  onChange?: (checked: boolean) => void
  required?: boolean
  indent?: boolean
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

const Checkbox = forwardRef<ComponentRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  (
    { checked, className, disabled, id, children, onChange, required, indent, small, ...props },
    ref
  ) => {
    const isTextOnly = typeof children === 'string' || typeof children === 'number'
    return (
      <div className={clsx(s.box, className)}>
        <LabelRadix.Root className={clsx(s.label, disabled && s.disabled, indent && s.indent)}>
          <div className={clsx(s.buttonWrapper, disabled && s.disabled, indent && s.indent)}>
            <CheckboxRadix.Root
              id={id}
              ref={ref}
              checked={checked}
              className={s.base}
              disabled={disabled}
              onCheckedChange={onChange}
              required={required}
              {...props}
            >
              {checked && (
                <CheckboxRadix.Indicator
                  asChild
                  className={clsx(s.indicator, disabled && s.disabled)}
                >
                  <span>
                    <CheckmarkOutline />
                  </span>
                </CheckboxRadix.Indicator>
              )}
            </CheckboxRadix.Root>
          </div>
          {isTextOnly ? (
            <Typography
              variant={small ? 'regularText12' : 'regularText14'}
              className={clsx(s.text, disabled && s.disabled)}
            >
              {children}
            </Typography>
          ) : (
            children
          )}
        </LabelRadix.Root>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
export default Checkbox
