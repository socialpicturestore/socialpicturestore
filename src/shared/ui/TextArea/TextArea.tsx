import { Typography } from '@/shared/ui'
import { Slot } from '@radix-ui/react-slot'
import { ComponentPropsWithRef, forwardRef } from 'react'
import styles from './TextArea.module.scss'
import clsx from 'classnames'

type TextAreaProps = ComponentPropsWithRef<'textarea'> & {
  label?: string
  error?: string
  asChild?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'textarea'

    const textAreaClassName = clsx(
      styles.textAreaField,
      {
        [styles.textAreaError]: error,
        [styles.textAreaDisabled]: props.disabled,
      },
      className
    )

    return (
      <div className={styles.textAreaWrapper}>
        <Typography as="label" variant="regularText14" className={styles.textAreaTitle}>
          {label}
        </Typography>

        <div className={styles.textAreaInnerWrapper}>
          <Comp {...props} ref={ref} className={textAreaClassName} />
        </div>
        {error && (
          <Typography as="p" variant="regularText14" className={styles.textAreaErrorMessage}>
            {error}
          </Typography>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
