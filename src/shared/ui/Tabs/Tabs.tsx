"use client"

import React, { Children, isValidElement } from 'react';
import styles from './Tabs.module.scss';
import { Tab, TabProps } from './Tab';

type TabsProps = {
    activeId: string; // ID активного таба (обязательный для контролируемого компонента)
    onTabChange: (id: string) => void; // Колбэк для изменения активного таба
    children: React.ReactNode;
    className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ activeId, onTabChange, children, className = '' }) => {
    // Фильтруем только дочерние элементы типа Tab
    const tabs = Children.toArray(children).filter(
        (child): child is React.ReactElement<TabProps> =>
            isValidElement(child) && child.type === Tab
    );

    return (
        <div className={`${styles.tabGroup} ${className}`}>
            <div className={styles.tabList} role="tablist">
                {tabs.map((tab) => {
                    const { id, label, disabled, className: tabClassName } = tab.props;
                    const isActive = id === activeId;

                    return (
                        <Tab
                            key={id}
                            id={id}
                            label={label}
                            disabled={disabled}
                            isActive={isActive} // Управляемый активный статус
                            onClick={() => !disabled && onTabChange(id)} // Вызываем колбэк при клике
                            className={tabClassName}
                        />
                    );
                })}
            </div>
        </div>
    );
};