import type {Meta, StoryObj} from "@storybook/react";
import Checkbox from './Checkbox'
import {useState} from "react";

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    argTypes: {
        checked: {control: 'boolean'},
        disabled: {control: 'boolean'},
        label: {control: 'text'},
        onChange: {action: 'changed'},
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        checked: true,
        label: 'Check me',
    },
};

export const WithoutLabel: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return (
            <Checkbox
                {...args}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
        );
    },
};

export const Disabled: Story = {
    args: {
        checked: false,
        disabled: true,
        label: 'Disabled',
    },
};

export const DisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true,
        label: 'Disabled checked',
    },
};

export const Interactive: Story = {
    args: {
        checked: false,
        label: 'Check',
    },
};

export const Compact: Story = {
    render: (args) => {
        const [checked, setChecked] = useState(false);
        return (
            <Checkbox
                {...args}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
        );
    },
    args: {
        label: 'Compact',
        indent: true
    },
};





