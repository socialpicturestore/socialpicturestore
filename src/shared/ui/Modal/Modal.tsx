'use client'

import React, { type ComponentProps, type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { Close } from '@/shared/assets/icons'
import { Button } from '@/shared/ui'
import clsx from 'classnames'

type Props = {
  open: boolean
  closeButton: boolean
  onClose: () => void
  children: ReactNode
  modalTitle: string
  separator?: boolean
  closeButtonClassName?: string
  contentClassName?: string
  headerClassName?: string
  modalTitleClassName?: string
  overlayClassName?: string
} & ComponentProps<'div'>

const Modal = ({
  modalTitle,
  onClose,
  children,
  open,
  closeButton,
  separator = true,
  closeButtonClassName,
  contentClassName,
  overlayClassName,
  headerClassName,
  modalTitleClassName,
  ...props
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className={clsx(s.overlay, overlayClassName)} />
        <Dialog.Content className={clsx(s.content, contentClassName)}>
          <div className={clsx(s.header, headerClassName)}>
            <Dialog.Title className={clsx(s.title, modalTitleClassName)}>{modalTitle}</Dialog.Title>
            {closeButton && (
              <Dialog.Close asChild>
                <Button variant={'withIcon'} className={closeButtonClassName} aria-label="Close">
                  <Close />
                </Button>
              </Dialog.Close>
            )}
          </div>
          {separator && <div className={s.separator} />}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
