// src/components/MyButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { CustomButton } from './custom-button';

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',
  component: CustomButton,
};

export default meta;
type Story = StoryObj<typeof CustomButton>;

export const Default: Story = {
  args: {
    variant: 'contained',
    children: 'Click Me',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined',
    color: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'contained',
    children: 'Disabled',
    disabled: true,
  },
};
