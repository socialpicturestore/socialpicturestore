import type { Meta, StoryObj } from '@storybook/react'
import { SelectBox } from '@/shared/ui'
import styles from './selectBox.module.scss'
import { FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'

const meta = {
  title: 'SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SelectBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: 'Select-box1' },
      { value: 'Select-box2' },
      { value: 'Select-box3' },
      { value: 'Select-box4' },
      { value: 'Select-box5' },
    ],
    variant: 'desktop',
    label: 'Select-Box',
    className: styles.testDesktopWidth,
  },
}

export const Disabled: Story = {
  args: {
    options: [
      { value: 'Select-box1' },
      { value: 'Select-box2' },
      { value: 'Select-box3' },
      { value: 'Select-box4' },
      { value: 'Select-box5' },
    ],
    variant: 'desktop',
    disabled: true,
    className: styles.testDesktopWidth,
  },
}

export const Languages: Story = {
  args: {
    options: [
      { value: 'Russian', icon: <FlagRussia /> },
      { value: 'UK', icon: <FlagUnitedKingdom /> },
    ],
    variant: 'desktop',
    className: styles.testLangWidth,
  },
}

export const LanguagesMobile: Story = {
  args: {
    options: [
      { value: 'Russian', icon: <FlagRussia /> },
      { value: 'United Kingdom', icon: <FlagUnitedKingdom /> },
    ],
    variant: 'mobileLang',
    isMobile: true,
  },
}

export const Pagination: Story = {
  args: {
    options: [{ value: '10' }, { value: '100' }, { value: '1000' }, { value: '10000' }],
    variant: 'pagination',
    isMobile: true,
  },
}
