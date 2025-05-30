import s from './Sidebar.module.scss'
import { ComponentPropsWithoutRef, forwardRef, type ReactNode } from 'react'

type SidebarProps = {
  width?: string
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'aside'>

const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({ width = '220px', children, className, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={s.sidebar}
        style={{ width }}
        aria-label="Основное меню"
        {...props}
      >
        {children}
      </aside>
    )
  }
)

Sidebar.displayName = 'Sidebar'
export { Sidebar }
