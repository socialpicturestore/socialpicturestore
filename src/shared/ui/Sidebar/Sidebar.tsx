import React, { forwardRef } from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode // Optional active icon
  disabled?: boolean
}

interface SidebarProps {
  items: {
    mainBlock: SidebarItem[]
    secondBlock: SidebarItem[]
    footer: SidebarItem[]
  }
  activeItemId: string | null
  onItemClick: (id: string) => void
}

export const Sidebar = forwardRef<HTMLAnchorElement, SidebarProps>(
  ({ items, activeItemId, onItemClick }, ref) => {
    return (
      <div className={styles.sidebarWrapper}>
        <nav className={styles.sidebarMenu}>
          <div className={styles.mainBlock}>
            {items.mainBlock.map(item => {
              const iconToShow =
                activeItemId === item.id && item.activeIcon ? item.activeIcon : item.icon
              return (
                <a
                  key={item.id}
                  className={`${styles.sidebarItem} 
              ${activeItemId === item.id ? styles.activeItem : ''}
              ${item.disabled ? styles.disableItem : ''}`}
                  onClick={() => !item.disabled && onItemClick(item.id)}
                  ref={ref}
                >
                  {iconToShow && <span className={styles.itemIcon}>{iconToShow}</span>}
                  <span className="sidebar-label">{item.label}</span>
                </a>
              )
            })}
          </div>
          <div className={styles.secondBlock}>
            {items.secondBlock.map(item => {
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
                  {iconToShow && (
                    <span className={`${activeItemId === item.id ? styles.activeIconItem : ''}`}>
                      {iconToShow}
                    </span>
                  )}
                  <span className="sidebar-label">{item.label}</span>
                </a>
              )
            })}
          </div>
          <div className={styles.footer}>
            {items.footer.map(item => {
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
                  {iconToShow && (
                    <span className={`${activeItemId === item.id ? styles.activeIconItem : ''}`}>
                      {iconToShow}
                    </span>
                  )}
                  <span className="sidebar-label">{item.label}</span>
                </a>
              )
            })}
          </div>
        </nav>
      </div>
    )
  }
)
