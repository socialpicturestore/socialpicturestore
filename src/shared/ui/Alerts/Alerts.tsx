import * as AlertPrimitive from '@radix-ui/react-toast'
import { ComponentProps, ReactNode } from 'react'
import clsx from 'classnames'
import s from './Alerts.module.scss'
import Close from '@/shared/assets/icons/Close'
import { Typography } from '../Typography/Typography'

export type AlertProps = {
  variant?: 'success' | 'error'
  title?: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
} & ComponentProps<typeof AlertPrimitive.Root>

const Alert = ({
  variant = 'success',
  title,
  open = true,
  onOpenChange,
  className,
  ...props
}: AlertProps) => {
  return (
    <AlertPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      className={clsx(s.alert, s[variant], className)}
      {...props}
    >
      <AlertPrimitive.Close className={s.closeButton}>
        <Close />
      </AlertPrimitive.Close>

      <div className={s.content}>
        {title && (
          <AlertPrimitive.Title asChild>
            <Typography variant="boldText16" className={s.title}>
              {title}
            </Typography>
          </AlertPrimitive.Title>
        )}
      </div>
    </AlertPrimitive.Root>
  )
}

export { Alert }
