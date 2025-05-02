import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/shared/ui'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: () => {
    return <DatePicker />
  },
}
