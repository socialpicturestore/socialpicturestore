import React from 'react'
import styles from './Recaptcha.module.scss'
import { Checkbox } from '@/shared/ui'
import CheckedIcon from '@/shared/assets/icons/CheckmarkOutline'
import RecaptchaIcon from '@/shared/assets/icons/RecaptchaLogo1'
import { Typography } from '@/shared/ui'

export type RecaptchaProps = {
  state: 'default' | 'hover' | 'checked' | 'loading' | 'error' | 'expired'
  disabled?: boolean // Управление отключением чекбокса
  onChange: () => void // Обработчик изменения состояния
}

const Recaptcha: React.FC<RecaptchaProps> = ({ state, onChange }) => {
  const isChecked = state === 'checked' // Определяем состояние чекбокса

  return (
    <div className={`${styles.recaptcha} ${styles[state]}`}>
      {/* Общий контейнер */}
      <div className={styles.container}>
        {/* Левый блок */}
        <div className={styles.leftBlock}>
          {state === 'expired' && (
            <p className={styles.expired}>Verification expired. Check the checkbox again.</p>
          )}
          {state === 'checked' ? (
            <div className={styles.checkblock}>
              <CheckedIcon width="29.49" height="30" style={{ color: '#19983B' }} />
              <Typography variant="regularText14">I'm not a robot</Typography>
            </div>
          ) : state === 'loading' ? (
            <div>
              <div className={styles.loadingIcon} /> {/* Анимированная крутилка */}
              <Typography variant="regularText14">I'm not a robot</Typography>
            </div>
          ) : (
            <Checkbox
              checked={isChecked}
              onChange={onChange}
              id="recaptcha-checkbox"
              className={styles.check}
            >
              <Typography variant="regularText14">I'm not a robot</Typography>
            </Checkbox>
          )}
        </div>

        {/* Правый блок */}
        <div className={styles.rightBlock}>
          {/* Иконка ReCaptcha */}
          <RecaptchaIcon width="60" height="65" />

          {/* Текст ReCaptcha */}
          <div>
            {/*<Typography variant="regularText12" className={styles.text}>*/}
            {/*  reCAPTCHA*/}
            {/*</Typography>*/}
            <Typography variant="smallLink">
              <a href="#" className={styles.smtext}>
                Privacy - Terms
              </a>
            </Typography>
          </div>
        </div>
      </div>

      {/* Сообщение об ошибке */}
      {state === 'error' && (
        <Typography variant="regularText12" className={styles.error}>
          Please verify that you are not a robot
        </Typography>
      )}
    </div>
  )
}

Recaptcha.displayName = 'Recaptcha'
export { Recaptcha }
