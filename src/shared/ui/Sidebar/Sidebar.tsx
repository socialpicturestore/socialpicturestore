import React, { forwardRef } from 'react'
import styles from './Sidebar.module.scss'

interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode // Optional active icon
  disabled?: boolean
  href: string
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

export const Sidebar = ({ items, activeItemId, onItemClick }:SidebarProps) => {
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
                >
                  {iconToShow && <span className={styles.itemIcon}>{iconToShow}</span>}
                  <span>{item.label}</span>
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
                  {iconToShow && <span className={styles.itemIcon}>{iconToShow}</span>}
                  <span>{item.label}</span>
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
                  {iconToShow && <span className={styles.itemIcon}>{iconToShow}</span>}
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>
        </nav>
      </div>
    )
  }
