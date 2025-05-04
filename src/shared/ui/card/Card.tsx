import { ReactNode } from 'react'
import styles from './Card.module.scss'

export interface CardProps {
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ title, children, footer }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardField}>
        {title && <div className={styles.cardHeader}>{title}</div>}
        <div className={styles.cardContent}>{children}</div>
        {footer && <div className={styles.cardFooter}>{footer}</div>}
      </div>
    </div>
  )
}

Card.displayName = 'Card'
