import type { ReactNode } from 'react'

export type SidebarItemType = {
  activeIcon: ReactNode
  defaultIcon: ReactNode
  href: string
  id: string
  isDisabled?: boolean
  text: string
  withSeparator?: boolean
}
