import React, { useState, useEffect, Children, isValidElement } from 'react';
import styles from './Tabs.module.scss';
import {Tab, TabProps} from './Tab';

// Типы
type TabGroupProps = {
    defaultActiveId?: string;
    activeId?: string;
    onTabChange?: (id: string) => void;
    children: React.ReactNode;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
};

const Tabs: React.FC<TabGroupProps> = ({
                                           defaultActiveId,
                                           activeId: externalActiveId,
                                           onTabChange,
                                           children,
                                           className = '',
                                           orientation = 'horizontal',
                                       }) => {
    const [internalActiveId, setInternalActiveId] = useState(defaultActiveId);
    const isControlled = externalActiveId !== undefined;
    const activeId = isControlled ? externalActiveId : internalActiveId;

    const tabs = Children.toArray(children).filter(
        (child): child is React.ReactElement<TabProps> =>
            isValidElement(child) && child.type === Tab
    );

    useEffect(() => {
        if (!activeId && tabs.length > 0) {
            const firstTabId = tabs[0].props.id;
            setInternalActiveId(firstTabId);
            onTabChange?.(firstTabId);
        }
    }, [activeId, tabs, onTabChange]);

    const handleTabChange = (id: string) => {
        if (!isControlled) setInternalActiveId(id);
        onTabChange?.(id);
    };

    const activeTab = tabs.find((tab) => tab.props.id === activeId);

    return (
        <div
            className={`${styles.tabGroup} ${className} ${styles[orientation]}`}
            data-orientation={orientation}
        >
            <div className={styles.tabList} role="tablist" aria-orientation={orientation}>
                {tabs.map((tab) => {
                    const { id, label, disabled, error, icon, className: tabClassName } = tab.props;
                    const isActive = id === activeId;

                    return (
                        <Tab
                            key={id}
                            id={id}
                            label={label}
                            disabled={disabled}
                            error={error}
                            icon={icon}
                            isActive={isActive}
                            onClick={() => !disabled && handleTabChange(id)}
                            className={tabClassName}
                        />
                    );
                })}
            </div>

            {activeTab && (
                <div
                    id={`tabpanel-${activeId}`}
                    className={styles.tabContent}
                    role="tabpanel"
                    aria-labelledby={`tab-${activeId}`}
                    tabIndex={0}
                >
                    {activeTab.props.children}
                </div>
            )}
        </div>
    );
};

Tabs.displayName = 'Tabs';

export const TabsRoot = Object.assign(Tabs, { Tab });