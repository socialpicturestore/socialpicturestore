import type { Meta, StoryObj } from '@storybook/react'
import { Button, Sidebar, Typography } from '@/shared/ui'
import React, { useState } from 'react'
import {
  Home,
  HomeOutline,
  PlusSquare,
  PlusSquareOutline,
  Person,
  PersonOutline,
  MessageCircle,
  MessageCircleOutline,
  Search,
  SearchOutline,
  TrendingUp,
  TrendingUpOutline,
  Bookmark,
  BookmarkOutline,
  LogOut,
} from '@/shared/assets/icons'
import s from './Sidebar.module.scss'
import { SidebarItem, SidebarItemType } from '@/shared/ui/Sidebar/SidebarItem'
import Link from 'next/link'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {},
}

const items: SidebarItemType[] = [
  {
    id: 'feed',
    text: 'Feed',
    defaultIcon: <HomeOutline />,
    activeIcon: <Home />,
    href: '#home',
  },
  {
    id: 'create',
    text: 'Create',
    defaultIcon: <PlusSquareOutline />,
    activeIcon: <PlusSquare />,
    href: '#create',
  },
  {
    id: 'profile',
    text: 'My Profile',
    defaultIcon: <PersonOutline />,
    activeIcon: <Person />,
    href: '#profile',
  },
  {
    id: 'message',
    text: 'Messages',
    defaultIcon: <MessageCircleOutline />,
    activeIcon: <MessageCircle />,
    href: '#message',
  },
  {
    id: 'search',
    text: 'Search',
    defaultIcon: <SearchOutline />,
    activeIcon: <Search />,
    href: '#search',
    withSeparator: true,
  },
  {
    id: 'statistics',
    text: 'Statistics',
    defaultIcon: <TrendingUpOutline />,
    activeIcon: <TrendingUp />,
    href: '#statistics',
    isDisabled: true,
  },
  {
    id: 'favorites',
    text: 'Favorites',
    defaultIcon: <BookmarkOutline />,
    activeIcon: <Bookmark />,
    href: '#favorites',
  },
]

export default meta

type Story = StoryObj<typeof Sidebar>

export const BasicStructure: Story = {
  render: () => {
    return (
      <Sidebar>
        <nav className={s.sidebarNav}>
          <ul className={s.list}>
            {items.map(item => (
              <SidebarItem as={Link} key={item.id} item={item} href={item.href} />
            ))}
          </ul>
        </nav>
        <div style={{ marginTop: '120px', marginLeft: '60px' }}>
          <Button variant={'withIcon'} style={{ padding: 0 }}>
            <LogOut />
            <Typography as={'span'} style={{ color: 'inherit' }}>
              Log Out
            </Typography>
          </Button>
        </div>
      </Sidebar>
    )
  },
}

export const InteractiveExample: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState<string>('#profile')

    const onItemClickHandler = (path: string) => {
      setCurrentPath(path)
    }

    return (
      <Sidebar>
        <nav className={s.sidebarNav}>
          <ul className={s.list}>
            {items.map(item => (
              <SidebarItem
                as={Link}
                key={item.id}
                item={item}
                isActive={currentPath === item.href}
                onItemClick={onItemClickHandler}
                href={item.href}
              />
            ))}
          </ul>
        </nav>
        <div style={{ marginTop: '120px', marginLeft: '60px' }}>
          <Button variant={'withIcon'} style={{ padding: 0 }}>
            <LogOut />
            <Typography as={'span'} style={{ color: 'inherit' }}>
              Log Out
            </Typography>
          </Button>
        </div>
      </Sidebar>
    )
  },
}
