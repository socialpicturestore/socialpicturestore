// Sidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@/shared/ui'
import React from 'react'
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
  LogOutOutline,
} from '@/shared/assets/icons'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    activeItemId: {
      control: 'select',
      options: [
        'home',
        'create',
        'profile',
        'message',
        'search',
        'statistics',
        'favorites',
        'logout',
        null,
      ],
      description: 'Currently active item ID',
    },
  },
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <HomeOutline />,
        activeIcon: <Home />,
        href: '#',
      },
      {
        id: 'create',
        label: 'Create',
        icon: <PlusSquareOutline />,
        activeIcon: <PlusSquare />,
        href: '#',
      },
      {
        id: 'profile',
        label: 'My Profile',
        icon: <PersonOutline />,
        activeIcon: <Person />,
        href: '#',
      },
      {
        id: 'message',
        label: 'Messages',
        icon: <MessageCircleOutline />,
        activeIcon: <MessageCircle />,
        href: '#',
      },
      {
        id: 'search',
        label: 'Search',
        icon: <SearchOutline />,
        activeIcon: <Search />,
        href: '#',
      },
      {
        id: 'statistics',
        label: 'Statistics',
        icon: <TrendingUpOutline />,
        activeIcon: <TrendingUp />,
        href: '#',
      },
      {
        id: 'favorites',
        label: 'Favorites',
        icon: <BookmarkOutline />,
        activeIcon: <Bookmark />,
        href: '#',
      },
    ],
    logout: {
      id: 'logout',
      label: 'LogOut',
      icon: <LogOutOutline />,
      activeIcon: <LogOut />,
      href: '#',
    },
    activeItemId: null,
    onItemClick: id => console.log('Item clicked:', id),
  },
}

export default meta

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {}

export const WithDisableIcons: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Home',
        icon: <HomeOutline />,
        activeIcon: <Home />,
        href: '#',
        disabled: true,
      },
      {
        id: 'create',
        label: 'Create',
        icon: <PlusSquareOutline />,
        activeIcon: <PlusSquare />,
        href: '#',
      },
      {
        id: 'profile',
        label: 'My Profile',
        icon: <PersonOutline />,
        activeIcon: <Person />,
        href: '#',
      },
      {
        id: 'message',
        label: 'Messages',
        icon: <MessageCircleOutline />,
        activeIcon: <MessageCircle />,
        href: '#',
      },
      {
        id: 'search',
        label: 'Search',
        icon: <SearchOutline />,
        activeIcon: <Search />,
        href: '#',
      },
      {
        id: 'statistics',
        label: 'Statistics',
        icon: <TrendingUpOutline />,
        activeIcon: <TrendingUp />,
        href: '#',
      },
      {
        id: 'favorites',
        label: 'Favorites',
        icon: <BookmarkOutline />,
        activeIcon: <Bookmark />,
        href: '#',
      },
    ],
    logout: {
      id: 'logout',
      label: 'LogOut',
      icon: <LogOutOutline />,
      activeIcon: <LogOut />,
      href: '#',
    },
  },
  parameters: {
    pseudo: { hover: false },
  },
}

export const InteractiveExample: Story = {
  render: function Render(args) {
    const [activeId, setActiveId] = React.useState(args.activeItemId)

    return (
      <Sidebar
        {...args}
        activeItemId={activeId}
        onItemClick={id => {
          setActiveId(id)
          args.onItemClick?.(id)
        }}
      />
    )
  },
}
