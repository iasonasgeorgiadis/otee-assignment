import type { Meta, StoryObj } from '@storybook/react';
import { ListChat } from './ListChat';

const meta: Meta<typeof ListChat> = {
  title: 'Components/ListChat',
  component: ListChat,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Single-line conversation row whose overflow menu appears on hover, mirroring the list-chat spec from Figma.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Chat or conversation title displayed within the row.'
    },
    forceHover: {
      control: { type: 'boolean' },
      description: 'Locks the hover visuals for documentation screenshots.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Safety Checklist Summary – Packaging Line PLC'
  }
};

export const HoverPreview: Story = {
  args: {
    ...Default.args,
    forceHover: true
  }
};

export const LongTitle: Story = {
  args: {
    title: 'R&D / Packaging Alignment Thread – Status + Blockers – Week 42 Follow-up'
  }
};
