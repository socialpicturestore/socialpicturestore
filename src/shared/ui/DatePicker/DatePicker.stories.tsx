import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/shared/ui'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,

  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof DatePicker>

export const RangeDatePicker: Story = {
  render: () => {
    return <DatePicker mode={'range'} />
  },
}

export const DisabledDatePicker: Story = {
  render: () => {
    return <DatePicker mode={'range'} disabled={true} />
  },
}

export const MutipleDatePicker: Story = {
  render: () => {
    return <DatePicker mode={'multiple'} />
  },
}

export const SingleDatePicker: Story = {
  render: () => {
    return <DatePicker mode={'single'} />
  },
}
