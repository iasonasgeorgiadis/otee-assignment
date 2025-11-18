import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CoverCard } from './CoverCard';

const meta: Meta<typeof CoverCard> = {
  title: 'Components/CoverCard',
  component: CoverCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `CoverCard displays a product image with a title below it, supporting light and dark color modes.

## Key Features

- **Color Modes**: Supports light (default) and dark modes with appropriate color schemes
- **Hover States**: Subtle text color changes on hover for interactive feedback
- **Image Support**: Uses ImagePlaceholder by default, supports custom images via imageUrl/imageSrc
- **Accessibility**: Keyboard navigation with natural text labeling and customizable image alt text
- **Design System Integration**: Uses design tokens from Figma specifications

## Usage Guidelines

- Use for product/content cards where visual hierarchy is important
- Light mode for light backgrounds, dark mode for dark backgrounds
- Title should be descriptive but concise
- Images are optional - component gracefully handles missing images

## Visual States

The component automatically handles hover states when clickable, changing title color based on mode:
- Light mode: Default #3c3e3f → Hover #5b5c5d
- Dark mode: Default #ffffff → Hover #f2f3f5`
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title text displayed below the image'
    },
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Color mode for the card (affects title color and image border)'
    },
    imageUrl: {
      control: 'text',
      description: 'URL for a custom image (optional)'
    },
    imageAlt: {
      control: 'text',
      description: 'Alternative text for the cover image (defaults to the title)'
    },
    onClick: {
      action: 'clicked',
      description: 'Optional click handler - makes the card interactive'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'International Studies of Economics'
  }
};

export const LightMode: Story = {
  args: {
    title: 'International Studies of Economics',
    mode: 'light'
  }
};

export const DarkMode: Story = {
  args: {
    title: 'International Studies of Economics',
    mode: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', padding: '40px', minHeight: '500px' }}>
        <Story />
      </div>
    )
  ]
};

export const WithCustomImage: Story = {
  args: {
    title: 'International Studies of Economics',
    imageUrl: 'https://via.placeholder.com/240x315/cccccc/666666?text=Book+Cover',
    mode: 'light'
  }
};

export const WithCustomImageDark: Story = {
  args: {
    title: 'International Studies of Economics',
    imageUrl: 'https://via.placeholder.com/240x315/333333/ffffff?text=Book+Cover',
    mode: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1a1a1a', padding: '40px', minHeight: '500px' }}>
        <Story />
      </div>
    )
  ]
};

export const Clickable: Story = {
  args: {
    title: 'International Studies of Economics',
    onClick: () => console.log('CoverCard clicked!')
  }
};

export const LongTitle: Story = {
  args: {
    title: 'International Studies of Economics and Global Financial Markets in the 21st Century',
    mode: 'light'
  }
};


// Interactive states demonstration
export const InteractiveStates: Story = {
  args: {
    title: 'Hover to see color change',
    onClick: () => console.log('CoverCard clicked!')
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the hover state behavior. The title color changes subtly on hover when the card is clickable, and a dark overlay appears over the image.'
      }
    }
  }
};

// All states showcase
export const AllStatesShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Light Mode - Default</h3>
        <div style={{ width: '240px' }}>
          <CoverCard title="International Studies of Economics" mode="light" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Light Mode - Clickable (hover me)</h3>
        <div style={{ width: '240px' }}>
          <CoverCard title="International Studies of Economics" mode="light" onClick={() => {}} />
        </div>
      </div>
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Dark Mode - Default</h3>
        <div style={{ width: '240px' }}>
          <CoverCard title="International Studies of Economics" mode="dark" />
        </div>
      </div>
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Dark Mode - Clickable (hover me)</h3>
        <div style={{ width: '240px' }}>
          <CoverCard title="International Studies of Economics" mode="dark" onClick={() => {}} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all CoverCard states side by side. Hover over the clickable cards to see the opacity overlay and text color changes.'
      }
    }
  }
};