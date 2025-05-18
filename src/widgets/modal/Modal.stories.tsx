import { Meta, StoryObj } from '@storybook/react'
import Modal from '@/widgets/modal/Modal'
import React, { useState } from 'react'
import { Button, Input, Typography } from '@/shared/ui'

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
        <Modal open={open} onClose={() => setOpen(false)} modalTitle={'Title'} closeButton={true}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur
            delectus ducimus eius placeat! Ab ad aliquam aspernatur deleniti, laboriosam modi nulla
            repellendus rerum sint sit tenetur voluptatem voluptates voluptatum!
          </Typography>
          <Input placeholder={'Password'} />
          <Input placeholder={'Email'} />

          <Button>LogIn</Button>
          <Button>LogOut</Button>
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
        <Modal open={open} onClose={() => setOpen(false)} modalTitle={'Title'} closeButton={false}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequatur
            delectus ducimus eius placeat! Ab ad aliquam aspernatur deleniti, laboriosam modi nulla
            repellendus rerum sint sit tenetur voluptatem voluptates voluptatum!
          </Typography>
          <Input placeholder={'Password'} />
          <Input placeholder={'Email'} />

          <Button>LogIn</Button>
          <Button>LogOut</Button>
        </Modal>
      </>
    )
  },
}
