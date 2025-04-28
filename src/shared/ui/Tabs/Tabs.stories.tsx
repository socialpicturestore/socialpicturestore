import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@/shared/ui'; // Или ваш путь

// Мета-данные компонента (обязательный default export)
const meta: Meta<typeof Tabs> = {
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// История для горизонтальных табов
export const Horizontal: Story = {
    render: () => (
        <div style={{ width: '500px', border: '1px solid #eee', padding: '20px' }}>
            <Tabs defaultActiveId="tab1" orientation="horizontal">
                <Tabs.Tab id="tab1" label="Профиль">
                    <div style={{ padding: '16px' }}>Содержимое профиля</div>
                </Tabs.Tab>
                <Tabs.Tab id="tab2" label="Настройки">
                    <div style={{ padding: '16px' }}>Параметры системы</div>
                </Tabs.Tab>
            </Tabs>
        </div>
    ),
};

// История для вертикальных табов
export const Vertical: Story = {
    render: () => (
        <div style={{ width: '500px', height: '300px', border: '1px solid #eee', padding: '20px' }}>
            <Tabs defaultActiveId="tab1" orientation="vertical">
                <Tabs.Tab id="tab1" label="Главная">
                    <div style={{ padding: '16px' }}>Добро пожаловать</div>
                </Tabs.Tab>
                <Tabs.Tab id="tab2" label="Каталог">
                    <div style={{ padding: '16px' }}>Товары и услуги</div>
                </Tabs.Tab>
            </Tabs>
        </div>
    ),
};