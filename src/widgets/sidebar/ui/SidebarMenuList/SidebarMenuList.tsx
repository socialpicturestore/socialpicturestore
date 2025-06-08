import { SidebarItem } from '@/shared/ui'
import Link from 'next/link'
import s from './SidebarMenuList.module.scss'
import type { SidebarItemType } from '@/widgets/sidebar/model/types/sidebar.types'

type Props = {
  items: SidebarItemType[]
  path: string
}

export const SidebarMenuList = ({ items, path }: Props) => {
  const onItemClickHandler = (href: string) => {
    return href === path
  }
  return (
    <nav className={s.sidebarNav}>
      <ul className={s.list}>
        {items.map(item => (
          <SidebarItem
            href={item.href}
            as={Link}
            key={item.id}
            item={item}
            isActive={onItemClickHandler(item.href)}
            onItemClick={onItemClickHandler}
          />
        ))}
      </ul>
    </nav>
  )
}
