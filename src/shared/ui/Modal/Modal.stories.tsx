import { Meta, StoryObj } from '@storybook/react'
import Modal from '@/shared/ui/Modal/Modal'
import React, { useState } from 'react'
import { Button, Typography } from '@/shared/ui'

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const WithCloseButtonModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(prev => !prev)}>Открыть диалог</button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          modalTitle={'Title'}
          closeButton
          separator
        >
          <Typography variant={'regularText16'}>
            Lorem ipsum dolor sit amet, elit. Aspernatur ducimus eius placeat!
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ width: '96px' }}>
              <Typography as={'span'} variant={'h3'}>
                OK
              </Typography>
            </Button>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithoutCloseButtonModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <button onClick={() => setOpen(prev => !prev)}>Открыть диалог</button>
        <Modal open={open} onClose={() => setOpen(false)} modalTitle={'Title'}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur
            delectus ducimus eius placeat! Ab ad aliquam aspernatur deleniti, laboriosam modi nulla
            repellendus rerum sint sit tenetur voluptatem voluptates voluptatum!
          </Typography>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant={'outline'} fullWidth>
              Yes
            </Button>
            <Button fullWidth>No</Button>
          </div>
        </Modal>
      </>
    )
  },
}
