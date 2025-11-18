import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Accordion component provides a collapsible content area with three size variants.

## Features
- **Size variants**: Small (16px), Medium (20px), Large (24px) typography
- **Interactive states**: Default and hover with smooth transitions
- **Accessibility**: Keyboard navigation (Enter/Space), ARIA attributes, focus management
- **Controlled/Uncontrolled**: Can be used in both modes
- **Animation**: Smooth expand/collapse with respect for reduced motion preferences

## Design System Integration
This component follows the Figma design specifications exactly, using design tokens for consistent styling across the system.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The visual size variant of the accordion',
    },
    title: {
      control: 'text',
      description: 'The title text for the accordion header',
    },
    descriptionText: {
      control: 'text',
      description: 'The description text content that shows when expanded',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion is expanded (controlled mode)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback when accordion is toggled',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Small: Story = {
  args: {
    size: 'small',
    title: 'Small Accordion',
    descriptionText: 'This is a small accordion with 16px bold typography in the header and 14px regular text in the content area. Perfect for compact interfaces.',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    title: 'Medium Accordion',
    descriptionText: 'This is a medium accordion with 20px semibold typography in the header and 16px regular text in the content area. Good for standard content sections.',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    title: 'Large Accordion',
    descriptionText: 'This is a large accordion with 24px semibold typography in the header and 16px regular text in the content area. Ideal for prominent content sections.',
  },
};

// Interactive Examples
export const Interactive: Story = {
  args: {
    size: 'medium',
    title: 'Interactive Accordion',
    descriptionText: 'Click the header to expand or collapse this accordion. Notice the smooth animation and hover effects.',
  },
  render: (args) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <Accordion
        {...args}
        expanded={expanded}
        onToggle={setExpanded}
      />
    );
  },
};

// State Examples
export const Expanded: Story = {
  args: {
    size: 'medium',
    title: 'Expanded Accordion',
    descriptionText: 'This accordion starts in the expanded state to show the content area styling.',
    expanded: true,
  },
};

export const Collapsed: Story = {
  args: {
    size: 'medium',
    title: 'Collapsed Accordion',
    descriptionText: 'This accordion starts in the collapsed state.',
    expanded: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'medium',
    title: 'Disabled Accordion',
    descriptionText: 'This accordion is disabled and cannot be interacted with.',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled accordions cannot be interacted with and show reduced opacity.',
      },
    },
  },
};

// Keyboard Navigation Example
export const KeyboardNavigation: Story = {
  args: {
    size: 'medium',
    title: 'Keyboard Accessible Accordion',
    descriptionText: 'Press Enter or Space to toggle this accordion. Focus management is handled automatically.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Supports keyboard navigation with Enter and Space keys. Focus states are clearly visible for accessibility.',
      },
    },
  },
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Accordion
        size="small"
        title="Small Size"
        descriptionText="Small accordion with 16px bold header and 14px content text."
        expanded={true}
      />
      <Accordion
        size="medium"
        title="Medium Size"
        descriptionText="Medium accordion with 20px semibold header and 16px content text."
        expanded={true}
      />
      <Accordion
        size="large"
        title="Large Size"
        descriptionText="Large accordion with 24px semibold header and 16px content text."
        expanded={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three size variants with consistent content to show the typography hierarchy.',
      },
    },
  },
};

// Multiple Accordions
export const MultipleAccordions: Story = {
  render: () => {
    const [expandedItems, setExpandedItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
      setExpandedItems(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    const accordionData = [
      { title: 'Account Settings', content: 'Manage your account preferences, password, and profile information.' },
      { title: 'Privacy & Security', content: 'Control your privacy settings, two-factor authentication, and data sharing preferences.' },
      { title: 'Notifications', content: 'Configure email notifications, push alerts, and communication preferences.' },
      { title: 'Billing & Payments', content: 'View your billing history, update payment methods, and manage subscriptions.' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '500px' }}>
        {accordionData.map((item, index) => (
          <Accordion
            key={index}
            size="medium"
            title={item.title}
            descriptionText={item.content}
            expanded={expandedItems.includes(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple accordions working together, where each can be independently expanded or collapsed.',
      },
    },
  },
};

// Custom Content
export const CustomContent: Story = {
  args: {
    size: 'medium',
    title: 'Accordion with Custom Content',
    expanded: true,
  },
  render: (args) => (
    <Accordion {...args}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p>This accordion uses custom React content instead of just text.</p>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Supports any React content</li>
          <li>Can include lists, buttons, images</li>
          <li>Maintains proper styling</li>
        </ul>
        <div style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <strong>Note:</strong> Custom content overrides the descriptionText prop.
        </div>
      </div>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordions can contain custom React content beyond simple text descriptions.',
      },
    },
  },
};
