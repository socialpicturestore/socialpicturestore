// Sidebar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Sidebar } from '@/shared/ui'
import React from 'react'
import {
  Home,
  HomeOutline,
  PlusSquare,
  PlusCircleOutline,
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
  tags:['autodocs'],
  argTypes: {
    activeItemId: {
      control: 'select',
      options: ['home', 'create', 'profile', 'message', 'search', null],
      description: 'Currently active item ID',
    },
  },
  args: {
    items: {
      mainBlock: [
        {
          id: 'home',
          label: 'Home',
          icon: <HomeOutline />,
          activeIcon: <Home />,
        },
        {
          id: 'create',
          label: 'Create',
          icon: <PlusCircleOutline />,
          activeIcon: <PlusSquare />,
        },
        {
          id: 'profile',
          label: 'My Profile',
          icon: <PersonOutline />,
          activeIcon: <Person />,
        },
        {
          id: 'message',
          label: 'Messages',
          icon: <MessageCircleOutline />,
          activeIcon: <MessageCircle />,
        },
        {
          id: 'search',
          label: 'Search',
          icon: <SearchOutline />,
          activeIcon: <Search />,
        },
      ],
      secondBlock: [
        { id: 'statistics', 
          label: 'Statistics', 
          icon: <TrendingUpOutline />, 
          activeIcon: <TrendingUp /> 
        },
        { id: 'favorites', 
          label: 'Favorites', 
          icon: <BookmarkOutline />, 
          activeIcon: <Bookmark /> 
        },
      ],
      footer: [{ id: 'logout', 
        label: 'Log Out', 
        icon: <LogOutOutline />,
         activeIcon: <LogOut /> }],
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
    items: {
      mainBlock: [
        {
          id: 'home',
          label: 'Home',
          icon: <HomeOutline />,
          activeIcon: <Home />,
          disabled: true
        },
        {
          id: 'create',
          label: 'Create',
          icon: <PlusCircleOutline />,
          activeIcon: <PlusSquare />,
        },
        {
          id: 'profile',
          label: 'My Profile',
          icon: <PersonOutline />,
          activeIcon: <Person />,
        },
        {
          id: 'message',
          label: 'Messages',
          icon: <MessageCircleOutline />,
          activeIcon: <MessageCircle />,
        },
        {
          id: 'search',
          label: 'Search',
          icon: <SearchOutline />,
          activeIcon: <Search />,
        },
      ],
      secondBlock: [
        { id: 'statistics', 
          label: 'Statistics', 
          icon: <TrendingUpOutline />, 
          activeIcon: <TrendingUp /> 
        },
        { id: 'favorites', 
          label: 'Favorites', 
          icon: <BookmarkOutline />, 
          activeIcon: <Bookmark /> 
        },
      ],
      footer: [{ id: 'logout', 
        label: 'Log Out', 
        icon: <LogOutOutline />,
         activeIcon: <LogOut /> }],
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
