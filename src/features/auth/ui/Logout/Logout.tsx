'use client'
import { Button, Typography } from '@/shared/ui'
import { LogOut } from '@/shared/assets/icons'
import { type ReactNode, useState } from 'react'
import { ConfirmationModal } from '@/entities/confirmationModal/ConfirmationModal'
import { useMeQuery } from '@/features/auth'

type Props = {
  onLogoutAction: () => void
  className?: string
}

export const Logout = ({ onLogoutAction, className }: Props) => {
  const [openModal, setOpenModal] = useState(false)
  const { data } = useMeQuery()

  const textContent: ReactNode = (
    <>
      Are you really want to log out of your account
      <Typography as={'span'} variant={'boldText16'}>
        “{data?.email}”
      </Typography>
      ?
    </>
  )
  return (
    <div className={className}>
      <Button variant={'withIcon'} onClick={() => setOpenModal(!openModal)}>
        <LogOut />
        <Typography as={'span'} style={{ color: 'inherit' }}>
          Log Out
        </Typography>
      </Button>
      <ConfirmationModal
        modalTitle={'Log Out'}
        isOpenModal={openModal}
        setIsOpenModal={setOpenModal}
        textContent={textContent}
        confirmCallback={onLogoutAction}
        leftButtonText={'Yes'}
        rightButtonText={'No'}
      />
    </div>
  )
}
