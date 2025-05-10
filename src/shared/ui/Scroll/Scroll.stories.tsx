import type { Meta } from '@storybook/react'

import { Scroll } from './Scroll'
import { Typography } from '@/shared/ui'

const meta: Meta<typeof Scroll> = {
  component: Scroll,
  title: 'Components/Scroll',
  tags: ['autodocs'],
}

export default meta

const tags = Array.from({ length: 50 }).map((_, i, a) => `example0${a.length - i}  `)

export const Vertical = {
  args: {
    style: { padding: '5px' },
    height: 220,
    width: 'fit-content',
    children: (
      <Typography style={{ width: '200px', margin: 0, color: 'darkgray' }}>{tags}</Typography>
    ),
  },
}

export const Horizontal = {
  args: {
    width: 200,
    style: { padding: '5px' },
    children: (
      <Typography style={{ width: '400px', marginTop: 0, color: 'darkgray' }}>{tags}</Typography>
    ),
  },
}

export const Mix = {
  args: {
    type: 'hover',
    style: { padding: '5px' },
    width: 200,
    height: 220,
    children: (
      <Typography style={{ width: '400px', height: '400px', marginTop: 0, color: 'darkgray' }}>
        {tags}
      </Typography>
    ),
  },
}
