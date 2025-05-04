import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import clsx from 'classnames'
import styles from './Card.module.scss'


export interface CardProps {
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, footer }) => {
   

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardField}>
            {title && <h3 className="font-bold text-lg mb-2">{title}</h3>}
            <div className={styles.cardContent}>{children}</div>
            {footer && <div className="border-t pt-2">{footer}</div>}
            </div>   
        </div>
    );
};

Card.displayName = 'Card'


