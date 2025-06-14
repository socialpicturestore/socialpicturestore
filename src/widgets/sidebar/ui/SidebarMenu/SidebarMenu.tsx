'use client'
import { Sidebar } from '@/shared/ui'
import { usePathname, useRouter } from 'next/navigation'
import { SidebarMenuList } from '@/widgets/sidebar/ui/SidebarMenuList/SidebarMenuList'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  Layers,
  LayersOutline,
  MessageCircle,
  MessageCircleOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@/shared/assets/icons'
import type { SidebarItemType } from '@/widgets/sidebar/model/types/sidebar.types'
import { PATHS } from '@/shared/const/path/paths'
import { Logout, useLogoutMutation } from '@/features/auth'
import s from './SidebarMenu.module.scss'

const sidebarItems: SidebarItemType[] = [
  {
    id: '1',
    text: 'Feed',
    defaultIcon: <HomeOutline />,
    activeIcon: <Home />,
    href: PATHS.APP.HOME,
  },
  {
    id: '2',
    text: 'Create',
    defaultIcon: <PlusSquareOutline />,
    activeIcon: <PlusSquare />,
    href: PATHS.APP.NEW_POST,
  },
  {
    id: '3',
    text: 'My Profile',
    defaultIcon: <LayersOutline />,
    activeIcon: <Layers />,
    href: PATHS.APP.PROFILE,
  },
  {
    id: '4',
    text: 'Messenger',
    defaultIcon: <MessageCircleOutline />,
    activeIcon: <MessageCircle />,
    href: PATHS.APP.MESSENGER,
  },
  {
    id: '5',
    text: 'Search',
    defaultIcon: <SearchOutline />,
    activeIcon: <Search />,
    href: PATHS.APP.SEARCH,
    withSeparator: true,
  },

  {
    id: '6',
    text: 'Statistics',
    defaultIcon: <TrendingUpOutline />,
    activeIcon: <TrendingUp />,
    href: PATHS.APP.STATISTICS,
  },
  {
    id: '7',
    text: 'Favorites',
    defaultIcon: <BookmarkOutline />,
    activeIcon: <Bookmark />,
    href: PATHS.APP.FAVORITES,
  },
]

export const SidebarMenu = () => {
  const currentPath = usePathname()
  const [logout] = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      debugger
      await logout().unwrap()
      router.push('/login')
    } catch (err) {
      debugger
      console.error('error on logout: ', err)
    }
  }

  return (
    <Sidebar>
      <SidebarMenuList items={sidebarItems} path={currentPath} />
      <Logout onLogoutAction={handleLogout} className={s.stickyItem} />
    </Sidebar>
  )
}
