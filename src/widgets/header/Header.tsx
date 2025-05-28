import React from 'react'
import s from './Header.module.scss'
import { Button, SelectBox, Typography } from '@/shared/ui'
import { BellOutlineIcon, FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'

const options = [
  { value: 'Russian', icon: <FlagRussia /> },
  { value: 'UK', icon: <FlagUnitedKingdom /> },
]

export const Header = ({ is_auth = false }: { is_auth?: boolean }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography variant="large">Inctagram</Typography>
        <div className={s.content}>
          {is_auth && (
            <Button variant="withIcon" className={s.bellButton}>
              <BellOutlineIcon />
              <Typography as="span" variant="small">
                3
              </Typography>
            </Button>
          )}

          <SelectBox options={options} className={s.select} />

          {!is_auth && (
            <div className={s.buttonsContainer}>
              <Button variant="text">Log in</Button>
              <Button>Sign up</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
