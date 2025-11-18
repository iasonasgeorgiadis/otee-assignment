import type { Meta, StoryObj } from '@storybook/react';
import { AccessTag } from './AccessTag';

const meta = {
  title: 'Components/AccessTag',
  component: AccessTag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The AccessTag component displays access model information for content, with three distinct variants:

- **Open Access**: Pink styling for openly accessible content
- **Free Access**: Orange styling for free content with restrictions
- **Free to Read**: Green styling for content that is free to read (type='full')

Each tag includes an icon and descriptive label matching the access model.
        `.trim(),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['open', 'free', 'full'],
      description: 'The access type to display',
      table: {
        type: { summary: "'open' | 'free' | 'full'" },
        defaultValue: { summary: 'open' },
      },
    },
    className: {
      control: 'text',
      description: 'Optional custom class name',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
} satisfies Meta<typeof AccessTag>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story showing Open Access
export const Default: Story = {
  args: {
    type: 'open',
  },
};

// Individual variant stories
export const OpenAccess: Story = {
  args: {
    type: 'open',
  },
  parameters: {
    docs: {
      description: {
        story: 'Open Access variant with pink styling (#b92d80).',
      },
    },
  },
};

export const FreeAccess: Story = {
  args: {
    type: 'free',
  },
  parameters: {
    docs: {
      description: {
        story: 'Free Access variant with orange styling (#cc4e00).',
      },
    },
  },
};

export const FreeToRead: Story = {
  args: {
    type: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Free to Read variant with green styling (#008945). Note: type is "full" but displays "Free to Read".',
      },
    },
  },
};

// All variants displayed together
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <AccessTag type="open" />
      <AccessTag type="free" />
      <AccessTag type="full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three access tag variants displayed together for comparison.',
      },
    },
  },
};

// Usage in different contexts
export const InArticleCard: Story = {
  render: () => (
    <div style={{
      border: '1px solid #e5e7eb',
      padding: '24px',
      borderRadius: '8px',
      maxWidth: '400px',
      fontFamily: 'Open Sans, sans-serif'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
          Research Article Title
        </h3>
        <AccessTag type="open" />
      </div>
      <p style={{ margin: '0', color: '#6b7280', fontSize: '14px', lineHeight: '1.4' }}>
        This is an example of how the AccessTag component would appear in an article card context,
        providing clear visual indication of the content's access model.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example usage of AccessTag in an article card layout.',
      },
    },
  },
};

// Custom styling example
export const WithCustomStyling: Story = {
  args: {
    type: 'free',
    className: 'custom-access-tag',
  },
  render: (args) => (
    <div>
      <style>
        {`
          .custom-access-tag {
            padding: 8px 12px;
            background-color: rgba(204, 78, 0, 0.1);
            border-radius: 4px;
            border: 1px solid rgba(204, 78, 0, 0.2);
          }
        `}
      </style>
      <AccessTag {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AccessTag with custom styling applied via className prop.',
      },
    },
  },
};