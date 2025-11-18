import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Single-line menu action that mirrors the OTee assignment spec. Supports two sizes, optional leading icon, hover preview, and disabled state.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Primary text inside the item.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Label' } },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['medium', 'small'],
      description: 'Visual size from the Figma spec.',
      table: { type: { summary: "'medium' | 'small'" }, defaultValue: { summary: 'medium' } },
    },
    withIcon: {
      control: { type: 'boolean' },
      description: 'Toggle the leading caret icon.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    hover: {
      control: { type: 'boolean' },
      description: 'Force the hover style (useful for docs/screenshots).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable pointer/keyboard interactions.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    iconName: {
      control: { type: 'text' },
      description: 'Material icon glyph for the leading indicator.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'play_arrow' } },
    },
    iconVariant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'symbols-outlined'],
      description: 'Material icon style to render.',
      table: { type: { summary: "'outlined' | 'filled' | 'symbols-outlined'" }, defaultValue: { summary: 'outlined' } },
    },
    onClick: {
      action: 'clicked',
      description: 'Fired when the item is activated.',
    },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MediumWithIcon: Story = {
  args: {
    label: 'Label',
    size: 'medium',
    withIcon: true,
  },
  parameters: {
    docs: {
      description: { story: 'Default state — medium height with the caret icon.' },
    },
  },
};

export const MediumWithoutIcon: Story = {
  args: {
    label: 'Label',
    size: 'medium',
    withIcon: false,
  },
  parameters: {
    docs: {
      description: { story: 'Medium item without the leading icon (matches the right column of the spec).' },
    },
  },
};

export const SmallWithIcon: Story = {
  args: {
    label: 'Label',
    size: 'small',
    withIcon: true,
  },
  parameters: {
    docs: {
      description: { story: 'Compact row with the icon container reduced to 32px.' },
    },
  },
};

export const SmallTextOnly: Story = {
  args: {
    label: 'Label',
    size: 'small',
    withIcon: false,
  },
  parameters: {
    docs: {
      description: { story: 'Small text-only item using Body Strong typography.' },
    },
  },
};

export const HoverState: Story = {
  args: {
    label: 'Label',
    hover: true,
  },
  parameters: {
    docs: {
      description: { story: 'Forces the hover surface so screenshots can match the Figma hover frames.' },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    disabled: true,
  },
  parameters: {
    docs: {
      description: { story: 'Example of the muted/disabled styling.' },
    },
  },
};

export const SpecShowcase = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 220px))',
      gap: '32px',
      padding: '16px',
      background: '#fff',
    }}
  >
    <div style={{ display: 'grid', gap: '16px' }}>
      <MenuItem label="Label" size="medium" withIcon />
      <MenuItem label="Label" size="medium" withIcon={false} />
      <MenuItem label="Label" size="small" withIcon={false} />
      <MenuItem label="Label" size="small" withIcon />
    </div>
    <div style={{ display: 'grid', gap: '16px' }}>
      <MenuItem label="Label" size="medium" withIcon hover />
      <MenuItem label="Label" size="medium" withIcon={false} hover />
      <MenuItem label="Label" size="small" withIcon={false} hover />
      <MenuItem label="Label" size="small" withIcon hover />
    </div>
  </div>
);

SpecShowcase.parameters = {
  docs: {
    description: {
      story: 'Side-by-side recreation of the Figma reference (default states on the left, hover states on the right).',
    },
  },
};
SpecShowcase.storyName = 'Design Spec Grid';
