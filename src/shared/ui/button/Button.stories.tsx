import type { Meta, StoryObj } from '@storybook/react'
import { FlagUnitedKingdom, LogOut, SettingsOutline } from '@/shared/assets/icons'
import { Typography } from '@/shared/ui'
import { fn } from '@storybook/test'
import { Button } from '@/shared/ui/button/Button'

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
    },
    variant: {
      control: { type: 'select' },
      color: { control: 'color' },
      options: ['primary', 'secondary', 'outline', 'text', 'withIcon'],
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
    onClick: fn(),
    withIcon: false,
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    ...Primary.args,
    children: 'Outline Button',
    variant: 'outline',
  },
}

export const FullWidth: Story = {
  args: {
    ...Primary.args,
    className: 'fullWidthButton',
    children: 'Full Width Button',
    variant: 'outline',
    fullWidth: true,
  },
}

export const Text: Story = {
  ...Primary.args,
  args: {
    children: 'Text Button',
    variant: 'text',
  },
}

export const Disabled: Story = {
  ...Primary.args,
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

export const ButtonWithIcon: Story = {
  ...Primary.args,
  render: args => (
    <Button asChild {...args}>
      <a href="#">
        <FlagUnitedKingdom />
        {args.text}
      </a>
    </Button>
  ),
  args: {
    text: 'Back',
    variant: 'withIcon',
  },
}

export const Back: Story = {
  ...Primary.args,
  render: args => (
    <Button asChild {...args}>
      <a href="#">
        <LogOut />
        {args.text}
      </a>
    </Button>
  ),
  args: {
    text: 'LogOut',
    variant: 'withIcon',
  },
}

export const TextWithIcon: Story = {
  ...Primary.args,
  render: args => (
    <Button asChild {...args}>
      <a href="#">
        <SettingsOutline />
        <Typography as="span" variant={'h3'} style={{ color: 'inherit' }}>
          {args.text}
        </Typography>
      </a>
    </Button>
  ),
  args: {
    variant: 'withIcon',
    text: 'Settings',
  },
}
