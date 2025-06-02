import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import clsx from 'classnames'
import s from './Sidebar.module.scss'
import { Typography } from '@/shared/ui'

export type SidebarItemType = {
  activeIcon: ReactNode
  defaultIcon: ReactNode
  href: string
  id: string
  isDisabled?: boolean
  text: string
  withSeparator?: boolean
}

type SideBarItemProps<T extends ElementType = 'a'> = {
  as?: T
  item: SidebarItemType
  onItemClick?: (href: string) => void
  isActive?: boolean
} & ComponentPropsWithoutRef<T>

export const SidebarItem = <T extends ElementType = 'a'>(props: SideBarItemProps<T>) => {
  const { as: Component = 'a', className, item, isActive, onItemClick, ...rest } = props

  return (
    <li className={s.listItem}>
      <Component
        aria-disabled={item.isDisabled}
        className={clsx(
          s.link,
          isActive && s.active,
          item.withSeparator && s.separator,
          item.isDisabled && s.disabled,
          className
        )}
        key={item.id}
        onClick={onItemClick && (() => onItemClick(item.href))}
        tabIndex={item.isDisabled ? -1 : 0}
        {...rest}
      >
        <span className={s.icon}>{isActive ? item.activeIcon : item.defaultIcon}</span>
        <Typography
          as={'span'}
          variant={isActive ? 'boldText14' : 'mediumText14'}
          style={{ color: 'inherit' }}
          className={s.text}
        >
          {item.text}
        </Typography>
      </Component>
    </li>
  )
}
