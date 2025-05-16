import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from './Alerts'
import { useState } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { Button } from '../Button/Button'

// Создаем декоратор для оборачивания всех сторисов в ToastProvider
const withToastProvider = (Story: any) => (
  <ToastPrimitive.Provider>
    <Story />
    <ToastPrimitive.Viewport className="AlertsViewport" />
  </ToastPrimitive.Provider>
)

const meta: Meta<typeof Alert> = {
  title: 'Components/Alerts',
  component: Alert,
  tags: ['autodocs'],
  decorators: [withToastProvider], // Добавляем декоратор ко всем сторисам
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Your settings are saved',
    open: true,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error! Server is not available',
    open: true,
  },
}

export const InteractiveExample = () => {
  const [successOpen, setSuccessOpen] = useState(false)
  const [errorOpen, setErrorOpen] = useState(false)

  return (
    <ToastPrimitive.Provider>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
        <Button onClick={() => setSuccessOpen(true)} variant="primary">
          Успех
        </Button>
        <Button onClick={() => setErrorOpen(true)} variant="secondary">
          Ошибка
        </Button>
      </div>

      <Alert variant="success" title="Успех!" open={successOpen} onOpenChange={setSuccessOpen} />
      <Alert variant="error" title="Ошибка" open={errorOpen} onOpenChange={setErrorOpen} />
      <ToastPrimitive.Viewport className="AlertsViewport" />
    </ToastPrimitive.Provider>
  )
}
