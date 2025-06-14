import { ComponentPropsWithoutRef } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type Props = ComponentPropsWithoutRef<typeof Dialog.Close>

export const DialogClose = ({ asChild, children, className, ...rest }: Props) => {
  return (
    <Dialog.Close asChild {...rest}>
      {children}
    </Dialog.Close>
  )
}
