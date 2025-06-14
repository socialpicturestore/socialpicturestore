import s from './ConfirmationModal.module.scss'
import type { ReactNode } from 'react'
import { Button, Typography, Modal, DialogClose } from '@/shared/ui'

interface IProps {
  modalTitle: string
  isOpenModal: boolean
  textContent: ReactNode
  leftButtonText: ReactNode
  rightButtonText: ReactNode
  confirmCallback: () => void
  setIsOpenModal: (isOpenModal: boolean) => void
}

export const ConfirmationModal = ({
  modalTitle,
  isOpenModal,
  textContent,
  leftButtonText,
  confirmCallback,
  rightButtonText,
  setIsOpenModal,
}: IProps) => {
  return (
    <Modal
      open={isOpenModal}
      closeButton
      modalTitle={modalTitle}
      onClose={() => setIsOpenModal(false)}
      contentClassName={s.contentWrapper}
    >
      <div className={s.childrenWrapper}>
        <Typography variant={'regularText16'}>{textContent}</Typography>
        <div className={s.buttonsWrapper}>
          <DialogClose>
            <Button className={s.modalButton} onClick={confirmCallback} variant={'outline'}>
              {leftButtonText}
            </Button>
          </DialogClose>
          <DialogClose>
            <Button className={s.modalButton}>{rightButtonText}</Button>
          </DialogClose>
        </div>
      </div>
    </Modal>
  )
}
