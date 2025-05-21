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
  items: SidebarItem[]
  logout: SidebarItem
  activeItemId: string | null
  onItemClick: (id: string) => void
}

export const Sidebar = ({ items, logout, activeItemId, onItemClick }: SidebarProps) => {
  return (
    <div className={styles.sidebarWrapper}>
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
      <footer className={styles.footer}>
        <a
          key={logout.id}
          className={`${styles.sidebarItem} 
                  ${activeItemId === logout.id ? styles.activeItem : ''}
                  ${logout.disabled ? styles.disableItem : ''}`}
          onClick={() => !logout.disabled && onItemClick(logout.id)}
        >
          {activeItemId === logout.id && logout.activeIcon ? (
            <span className={styles.itemIcon}>{logout.activeIcon}</span>
          ) : (
            <span className={styles.itemIcon}>{logout.icon}</span>
          )}
          <span>{logout.label}</span>
        </a>
      </footer>
    </div>
  )
}
