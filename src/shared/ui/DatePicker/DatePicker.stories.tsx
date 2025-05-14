import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '@/shared/ui'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,

  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta

type Story = StoryObj<typeof DatePicker>

export const SingleDatePicker: Story = {
  render: () => {
    const [selectedSingle, setSelectedSingle] = useState<Date | DateRange | undefined>()
    return (
      <DatePicker
        mode={'single'}
        selectedDate={selectedSingle}
        setSelectedDate={setSelectedSingle}
      />
    )
  },
}

export const RangeDatePicker: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<Date | DateRange | undefined>()
    return (
      <DatePicker mode={'range'} selectedDate={selectedRange} setSelectedDate={setSelectedRange} />
    )
  },
}

export const WeekDatePicker: Story = {
  render: () => {
    const [selectedWeek, setSelectedWeek] = useState<Date | DateRange | undefined>()
    return (
      <DatePicker mode={'week'} selectedDate={selectedWeek} setSelectedDate={setSelectedWeek} />
    )
  },
}

export const ErrorDatePicker: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<Date | DateRange | undefined>()
    const error = 'Error Error Error'
    return (
      <DatePicker
        mode={'range'}
        selectedDate={selectedRange}
        setSelectedDate={setSelectedRange}
        error={error}
      />
    )
  },
}

export const DisabledDatePicker: Story = {
  render: () => {
    const [selectedRange, setSelectedRange] = useState<Date | DateRange | undefined>()
    return (
      <DatePicker
        mode={'range'}
        disabled={true}
        selectedDate={selectedRange}
        setSelectedDate={setSelectedRange}
      />
    )
  },
}
