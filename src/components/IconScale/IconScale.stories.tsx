import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconScale } from './IconScale';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

const meta = {
  title: 'Components/IconScale',
  component: IconScale,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'IconScale displays icons at standardized sizes (16px, 24px, 32px, 64px, 128px) for consistent icon usage across the design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: { type: 'text' },
      description: 'Material Icon name to display',
    },
    showLabels: {
      control: { type: 'boolean' },
      description: 'Show size labels below icons',
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 16, 24, 32, 64, 128],
      description: 'Display a single size instead of all sizes',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof IconScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSizes: Story = {
  args: {
    iconName: 'account_circle',
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows all available icon sizes with labels.',
      },
    },
  },
};

export const WithoutLabels: Story = {
  args: {
    iconName: 'account_circle',
    showLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon scale without size labels for cleaner appearance.',
      },
    },
  },
};

export const SingleSize: Story = {
  args: {
    iconName: 'settings',
    size: 32,
    showLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Display a single icon size, useful for specific size documentation.',
      },
    },
  },
};

export const DifferentIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#6f7071' }}>Navigation Icons</h4>
        <IconScale iconName="home" showLabels />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#6f7071' }}>Action Icons</h4>
        <IconScale iconName="add_circle" showLabels />
      </div>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#6f7071' }}>Status Icons</h4>
        <IconScale iconName="check_circle" showLabels />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon types displayed at various scales.',
      },
    },
  },
};

export const IconSizeReference: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h3 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 600 }}>Icon Size Guidelines</h3>
      <div style={{ display: 'grid', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MaterialIcon name="info" size={16} />
          <div>
            <strong>16px</strong> - Small inline icons, badges, tight spaces
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MaterialIcon name="info" size={24} />
          <div>
            <strong>24px</strong> - Default size for most UI icons
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MaterialIcon name="info" size={32} />
          <div>
            <strong>32px</strong> - Emphasized actions, larger touch targets
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MaterialIcon name="info" size={64} />
          <div>
            <strong>64px</strong> - Feature icons, empty states
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MaterialIcon name="info" size={128} />
          <div>
            <strong>128px</strong> - Hero icons, illustrations
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Reference guide showing when to use each icon size.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const icons = ['home', 'search', 'favorite', 'settings', 'account_circle'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {icons.map(icon => (
          <div key={icon} style={{
            padding: '16px',
            border: '1px solid #e9ebec',
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#6f7071' }}>{icon}</h4>
            <IconScale iconName={icon} showLabels={false} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing common icons at all sizes.',
      },
    },
  },
};