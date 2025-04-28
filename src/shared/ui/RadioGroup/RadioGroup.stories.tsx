import { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const options = [
  { value: 'option1', label: 'RadioGroup' },
  { value: 'option2', label: 'RadioGroup' },
]

export const Default: Story = {
  args: {
    value: 'option1',
    onValueChange: value => console.log(value),
    options,
  },
}

export const Active: Story = {
  args: {
    value: 'option1',
    onValueChange: value => console.log(value),
    options,
  },
}

export const Hover: Story = {
  args: {
    value: 'option1',
    onValueChange: value => console.log(value),
    options,
  },
}

export const Focus: Story = {
  args: {
    value: 'option1',
    onValueChange: value => console.log(value),
    options,
  },
}

export const Disabled: Story = {
  args: {
    value: 'option1',
    onValueChange: value => console.log(value),
    options: [
      { value: 'option1', label: 'RadioGroup', disabled: true },
      { value: 'option2', label: 'RadioGroup', disabled: true },
    ],
  },
}
