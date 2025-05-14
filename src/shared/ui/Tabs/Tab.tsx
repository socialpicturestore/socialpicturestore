import React from 'react'
import styles from './Tabs.module.scss'
import { Button, Typography } from '@/shared/ui'
import clsx from 'classnames'

export type TabProps = {
  id: string
  label: React.ReactNode
  isActive?: boolean // Является ли таб активным
  disabled?: boolean // Отключен ли таб
  onClick?: () => void // Обработчик клика
  className?: string
}

const Tab: React.FC<TabProps> = ({
  id,
  label,
  isActive = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <Button
      id={`tab-${id}`}
      className={`${styles.tab} ${isActive ? styles.active : ''} ${
        disabled ? styles.disabled : ''
      } ${className}`}
      onClick={disabled ? undefined : onClick}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive && !disabled ? 0 : -1}
      disabled={disabled}
    >
      <Typography
        variant="h3"
        className={clsx(
          styles.label,
          isActive ? styles['label.accent'] : styles['label.default'],
          disabled && styles['label.disabled']
        )}
      >
        {label}
      </Typography>
    </Button>
  )
}

Tab.displayName = 'Tab'
export { Tab }
