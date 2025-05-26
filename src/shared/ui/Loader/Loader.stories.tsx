// components/ui/Loader/Loader.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './Loader'

// Определяем тип пропсов
type LoaderStory = StoryObj<typeof Loader>

// Создаём Meta
const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    fullScreen: {
      control: 'boolean',
      description: 'Показывает лоадер во весь экран с затемнением',
    },
  },
  args: {
    fullScreen: false,
  },
} satisfies Meta<typeof Loader>

export default meta

// Экспортируем сторисы

export const Default: LoaderStory = {
  args: {
    fullScreen: false,
  },
}

export const Fullscreen: LoaderStory = {
  args: {
    fullScreen: true,
  },
}
