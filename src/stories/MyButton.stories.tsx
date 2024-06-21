import type { Meta, StoryObj } from '@storybook/react';
import { MyButton } from '../components';

const meta: Meta<typeof MyButton> = {
    component: MyButton,
    title: 'MyButton',
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Red: Story = {
    args: {
        backgroundColor: 'red',
    },
};

export const Yellow: Story = {
    args: {
        backgroundColor: 'yellow',
    },
};
