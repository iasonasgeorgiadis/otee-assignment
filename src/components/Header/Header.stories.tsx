import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The OTee header mirrors the responsive behavior documented in Figma. It keeps the logo centered, groups icon-only actions on the left, and exposes secondary controls on the right.

- **Desktop** (≥ 1024px): Three primary icon buttons on the left, pill-shaped "Shared resources" button and avatar on the right.
- **Tablet** (< 1024px): Shared resources text collapses, keeping a circular globe icon and avatar.
- **Mobile** (< 640px): The left action group hides in favor of a single menu icon, and only the avatar remains on the right.
        `
      }
    }
  },
  argTypes: {
    onClipboardClick: { action: 'clipboard clicked' },
    onGridClick: { action: 'grid clicked' },
    onThemeClick: { action: 'theme toggled' },
    onMenuClick: { action: 'menu toggled' },
    onSharedResourcesClick: { action: 'shared resources clicked' },
    onProfileClick: { action: 'profile clicked' }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'ipad'
    }
  }
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
