'use client'

import React, { type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import s from './Modal.module.scss'
import { Close } from '@/shared/assets/icons'
import { Button } from '@/shared/ui'

type Props = {
  open: boolean
  closeButton: boolean
  onClose: () => void
  children: ReactNode
  modalTitle: string
}

const Modal = ({ modalTitle, onClose, children, open, closeButton }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <Dialog.Title className={s.title}>{modalTitle}</Dialog.Title>
          {children}
          {closeButton ? (
            <Dialog.Close asChild>
              <Button variant={'text'} className={s.iconButton} aria-label="Close">
                <Close />
              </Button>
            </Dialog.Close>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
