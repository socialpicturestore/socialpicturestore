import React, {
    useState,
    useEffect,
    Children,
    ReactNode,
    isValidElement,
} from 'react';
import styles from './Tabs.module.scss';

// Типы
type TabProps = {
    id: string;
    label: ReactNode;
    disabled?: boolean;
    error?: boolean;
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
};

type TabGroupProps = {
    defaultActiveId?: string;
    activeId?: string;
    onTabChange?: (id: string) => void;
    children: ReactNode;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
};

const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

const TabGroup: React.FC<TabGroupProps> = ({
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

    const activeTab = tabs.find(tab => tab.props.id === activeId);

    return (
        <div
            className={`${styles.tabGroup} ${className} ${styles[orientation]}`}
            data-orientation={orientation}
        >
            <div className={styles.tabList} role="tablist" aria-orientation={orientation}>
                {tabs.map(tab => {
                    const { id, icon, label, disabled, error, className: tabClassName } = tab.props;
                    const isActive = id === activeId;

                    return (
                        <button
                            key={id}
                            id={`tab-${id}`}
                            className={`${styles.tab} ${isActive ? styles.active : ''} ${
                                disabled ? styles.disabled : ''
                            } ${error ? styles.error : ''} ${tabClassName || ''}`}
                            onClick={() => !disabled && handleTabChange(id)}
                            disabled={disabled}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${id}`}
                            aria-disabled={disabled}
                            tabIndex={isActive ? 0 : -1}
                        >
                            {icon && <span className={styles.icon}>{icon}</span>}
                            {label}
                            {error && <span className={styles.errorIndicator} aria-hidden="true">!</span>}
                        </button>
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
export { Tab, TabGroup };