import { Meta, StoryObj } from "@storybook/react"
import { Card } from "./Card"
import {Input} from '../Input/Input';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
    tags:["autodocs"],
    
  } satisfies Meta<typeof Card>;
  
  export default meta
  
  type Story = StoryObj<typeof Card>

  export const CardWithEmailInput: Story = {
    render: () => (
      <Card title="Вход">
        <Input 
          label="Email" 
          variant="email" 
          placeholder="Введите email" 
        />
      </Card>
    ),
  };    

  export const CardWithPasswordInput: Story = {
    render: () => (
      <Card title="Регистрация">
        <Input
          label="Пароль" 
          variant="password" 
          placeholder="Введите пароль" 
        />
      </Card>
    ),
  };