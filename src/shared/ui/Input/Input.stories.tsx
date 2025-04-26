import { Search } from '@/shared/assets/icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: {
    placeholder: 'Введите текст...',
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
  },
}

export const WithSearchIcon: Story = {
  args: {
    label: 'Поиск',
    startIcon: <Search />,
    placeholder: 'Поиск...',
  },
}

export const WithEyeIcon: Story = {
  args: {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Введите пароль',
    // endIcon не нужен отдельно — глаз обрабатывается прямо внутри компонента по типу
  },
}

export const Error: Story = {
  args: {
    label: 'Email',
    error: 'Некорректный email',
    value: 'user@email.com',
  },
}

export const Focus: Story = {
  args: {
    label: 'Email',
    placeholder: 'Фокус',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Hover: Story = {
  args: {
    label: 'Email',
    placeholder: 'Наведи на меня',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Active: Story = {
  args: {
    label: 'Email',
    placeholder: 'Поставь курсор',
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Выключен',
    disabled: true,
  },
}
