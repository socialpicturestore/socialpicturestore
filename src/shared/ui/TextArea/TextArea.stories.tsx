import { TextArea } from '@/shared/ui'
import { StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,

  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Text-area',
    placeholder: 'Field for something...',
  },
}

export const Active: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'Error text',
  },
}

export const Hover: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
}
