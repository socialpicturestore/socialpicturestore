import styles from './Sidebar.module.scss'
import type { ComponentProps, ReactNode } from 'react'

interface SidebarItem {
  id: string
  label: string
  icon: ReactNode
  activeIcon?: ReactNode // Optional active icon
  disabled?: boolean
  href: string
}

interface SidebarProps extends ComponentProps<'aside'> {
  items: SidebarItem[]
  activeItemId: string | null
  onItemClick: (id: string) => void
  children?: ReactNode
  className?: string
}

export const Sidebar = ({
  items,
  children,
  activeItemId,
  onItemClick,
  className,
  ...props
}: SidebarProps) => {
  return (
    <aside className={styles.sidebarWrapper} {...props}>
      <nav className={styles.sidebarMenu}>
        {items.map(item => {
          const iconToShow =
            activeItemId === item.id && item.activeIcon ? item.activeIcon : item.icon
          return (
            <a
              key={item.id}
              className={`${styles.sidebarItem} 
                  ${activeItemId === item.id ? styles.activeItem : ''}
                  ${item.disabled ? styles.disableItem : ''}`}
              onClick={() => !item.disabled && onItemClick(item.id)}
            >
              {iconToShow && <span className={styles.itemIcon}>{iconToShow}</span>}
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>
      {children && (
        <div className={className ? `${className} ${styles.footer}` : styles.footer}>
          {children}
        </div>
      )}
    </aside>
  )
}
