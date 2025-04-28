import React from 'react';
import styles from './Tabs.module.scss';
import { Typography } from '@/shared/ui';

// Типы
export type TabProps = {
    id: string;
    label: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    icon?: React.ReactNode;
    isActive?: boolean; // Добавляем пропс для активного состояния
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode; // Добавляем children
};

export const Tab: React.FC<TabProps> = ({
                                            id,
                                            label,
                                            disabled,
                                            error,
                                            icon,
                                            isActive,
                                            onClick,
                                            className = '',
                                            children, // Теперь children доступен
                                        }) => {
    return (
        <button
            id={`tab-${id}`}
            className={`${styles.tab} ${isActive ? styles.active : ''} ${
                disabled ? styles.disabled : ''
            } ${error ? styles.error : ''} ${className}`}
            onClick={onClick}
            disabled={disabled}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {/* Используем Typography для метки */}
            <Typography variant="h3" as="span" className={styles.label}>
                {label}
            </Typography>
            {error && <span className={styles.errorIndicator} aria-hidden="true">!</span>}
            {/* Отображаем children, если они переданы */}
            {children}
        </button>
    );
};