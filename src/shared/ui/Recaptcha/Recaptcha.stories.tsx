import { Recaptcha } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/react'

type Story = StoryObj<typeof Recaptcha>

const meta: Meta<typeof Recaptcha> = {
  title: 'Components/Recaptcha',
  component: Recaptcha,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: {
        type: 'radio',
        options: ['default', 'hover', 'checked', 'loading', 'error', 'expired'],
      },
    },
    disabled: {
      control: 'boolean',
    },
    onChange: {
      action: 'onChange',
    },
  },
  args: {
    state: 'default',
    onChange: () => {},
  },
}

export default meta

export const Default: Story = {
  args: {
    state: 'default',
  },
}

export const Hover: Story = {
  args: {
    state: 'hover',
  },
}

export const Checked: Story = {
  args: {
    state: 'checked',
  },
}

export const Loading: Story = {
  args: {
    state: 'loading',
  },
}

export const ErrorState: Story = {
  args: {
    state: 'error',
  },
}

export const Expired: Story = {
  args: {
    state: 'expired',
  },
}

export const Disabled: Story = {
  args: {
    state: 'default',
    disabled: true,
  },
}
