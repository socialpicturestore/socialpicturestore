import { Pagination } from '@/shared/ui'
import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// First page story with explicit props to satisfy TypeScript
export const FirstPage: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 550,
    siblingCount: 1,
  },
  render: args => {
    const [page, setPage] = useState<number>(args.currentPage)
    const [size, setSize] = useState<number>(args.pageSize)
    return (
      <Pagination
        currentPage={page}
        pageSize={size}
        totalCount={args.totalCount}
        siblingCount={args.siblingCount}
        onPageChange={setPage}
        onPageSizeChange={val => setSize(Number(val))}
      />
    )
  },
}

// story with explicit props
export const SevenPage: Story = {
  args: {
    currentPage: 7,
    pageSize: 10,
    totalCount: 550,
    siblingCount: 1,
  },
  render: args => {
    const [page, setPage] = useState<number>(args.currentPage)
    const [size, setSize] = useState<number>(args.pageSize)
    return (
      <Pagination
        currentPage={page}
        pageSize={size}
        totalCount={args.totalCount}
        siblingCount={args.siblingCount}
        onPageChange={setPage}
        onPageSizeChange={val => setSize(Number(val))}
      />
    )
  },
}
