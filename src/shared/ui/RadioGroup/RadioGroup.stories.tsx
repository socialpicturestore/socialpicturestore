import { RadioGroup } from '@/shared/ui'
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'radio',
        options: ['option1', 'option2'],
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const options = [
  { value: 'option1', label: 'RadioGroupV1' },
  { value: 'option2', label: 'RadioGroupV2' },
]

export const Default: Story = {
  render: ({ value, ...args }) => {
    const [val, setVal] = useState<string>(value ?? '')
    return <RadioGroup {...args} value={val} onValueChange={setVal} options={options} />
  },
  args: {
    value: 'option1',
  },
}

export const Disabled: Story = {
  render: ({ value, ...args }) => {
    const [val, setVal] = useState<string>(value ?? '')
    return (
      <RadioGroup
        {...args}
        value={val}
        onValueChange={setVal}
        options={options.map(opt => ({ ...opt, disabled: true }))}
      />
    )
  },
  args: {
    value: 'option1',
  },
}
