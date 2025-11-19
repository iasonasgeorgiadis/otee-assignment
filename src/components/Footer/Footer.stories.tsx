import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default diagnostics footer.
 * Uses Button components for 'Diagnostics' and 'Clear messages'.
 * Resize the viewport to see responsive behavior:
 * - Mobile (<768px): Stacked layout with full-width buttons
 * - Tablet (768px-1023px): Row layout with medium button styling
 * - Desktop (≥1024px): Row layout with smaller typography and compact buttons
 */
export const Default: Story = {};

/**
 * Mobile viewport example (375px).
 * Shows stacked column layout with:
 * - Full-width Diagnostics button
 * - Status counts in a row
 * - Full-width Clear messages button
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet viewport example (768px).
 * Shows horizontal layout with:
 * - Diagnostics button and status counts in a row
 * - Clear messages button on the right
 */
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Desktop viewport example (1440px).
 * Shows compact horizontal layout with:
 * - Smaller typography (14px, weight 700)
 * - Status labels visible (Errors:, Warnings:, Messages:)
 * - Compact button sizing
 */
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
