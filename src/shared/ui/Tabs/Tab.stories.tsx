import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';


const meta: Meta<typeof Tab> = {
    title: 'Components/Tab',
    component: Tab,
    args: {
        label: 'Таб 1',
    },
};

export default meta;

type Story = StoryObj<typeof Tab>;

// Стори: Default (по умолчанию)
export const Default: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
        onClick: () => alert('Таб кликнут'),
    },
};



// Стори: Активный таб
export const Active: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
        isActive: true,
        onClick: () => alert('Таб кликнут'),
    },
};

// Стори: Отключенный таб
export const Disabled: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
        disabled: true,
    },
};

// Стори: С ошибкой
export const Error: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
        error: true,
        onClick: () => alert('Таб кликнут'),
    },
};

// Стори: Focus (фокус)
export const Focus: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
    },
    parameters: {
        pseudo: { focus: true }, // Имитация фокуса
    },
};

// Стори: Hover (наведение)
export const Hover: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
    },
    parameters: {
        pseudo: { hover: true }, // Имитация наведения
    },
};

// Стори: С дочерними элементами (children)
export const WithChildren: Story = {
    args: {
        id: 'tab1',
        label: 'Таб 1',
        children: <span style={{ color: 'blue' }}>Дополнительное содержимое</span>,
    },
};