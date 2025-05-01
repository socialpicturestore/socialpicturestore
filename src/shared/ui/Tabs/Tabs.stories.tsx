import React from 'react';
import { Tab } from './Tab';
import type { Meta, StoryObj } from '@storybook/react';

// Типы пропсов компонента Tab
export type TabProps = {
    id: string;
    label: React.ReactNode;
    isActive?: boolean; // Является ли таб активным
    disabled?: boolean; // Отключен ли таб
    onClick?: () => void; // Обработчик клика
    className?: string;
};

// Метаданные для Storybook
const meta: Meta<typeof Tab> = {
    title: 'Components/Tab', // Путь к категории в Storybook
    component: Tab, // Компонент, который документируется
    argTypes: {
        onClick: { action: 'clicked' }, // Логирование кликов
    },
};

// Экспорт метаданных
export default meta;

// Тип истории
type Story = StoryObj<typeof Tab>;

// Шаблон для историй
const Template: Story = {
    render: (args) => <Tab {...args} />,
};

// История: Активный таб по умолчанию
export const ActiveTab: Story = {
    ...Template,
    args: {
        id: 'active-tab',
        label: 'Активный таб',
        isActive: true,
        disabled: false,
    },
};

// История: Неактивный таб по умолчанию
export const InactiveTab: Story = {
    ...Template,
    args: {
        id: 'inactive-tab',
        label: 'Неактивный таб',
        isActive: false,
        disabled: false,
    },
};

// История: Отключенный таб
export const DisabledTab: Story = {
    ...Template,
    args: {
        id: 'disabled-tab',
        label: 'Отключенный таб',
        isActive: false,
        disabled: true,
    },
};