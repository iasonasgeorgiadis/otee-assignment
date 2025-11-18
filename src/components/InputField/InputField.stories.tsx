import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/testing-library';
import { InputField } from './InputField';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Clean, minimal input field component that matches the Figma design system. Features optional leading and trailing icons, system status states (error/success), and two sizes. Default state has no icons (per Figma design). Hover and focus states are handled via CSS pseudo-classes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Current value of the input field',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when input is empty',
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'small'],
      description: 'Size variant of the input field',
    },
    status: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Status type that affects styling and icons',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input field is disabled',
    },
    showLeadIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the leading icon (defaults to search)',
    },
    showEndIcon: {
      control: { type: 'boolean' },
      description: 'Whether to show the trailing icon (defaults to close)',
    },
    leadIcon: {
      control: { type: 'boolean' },
      description: 'Custom leading icon',
      mapping: {
        true: <MaterialIcon name="person" size={24} />,
        false: undefined,
      },
    },
    endIcon: {
      control: { type: 'boolean' },
      description: 'Custom trailing icon',
      mapping: {
        true: <MaterialIcon name="visibility" size={24} />,
        false: undefined,
      },
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic States
export const Default: Story = {
  args: {
    placeholder: 'Input',
    size: 'medium',
    status: 'default',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text value',
    placeholder: 'Input',
    size: 'medium',
    status: 'default',
  },
};

// Size Variants
export const Medium: Story = {
  args: {
    placeholder: 'Medium size input',
    size: 'medium',
    status: 'default',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small size input',
    size: 'small',
    status: 'default',
  },
};

// Status States
export const Error: Story = {
  args: {
    value: 'invalid-email',
    placeholder: 'Enter your email',
    status: 'error',
    size: 'medium',
  },
};

export const Success: Story = {
  args: {
    value: 'user@example.com',
    placeholder: 'Enter your email',
    status: 'success',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    size: 'medium',
  },
};

// Icon Variants
export const WithLeadIcon: Story = {
  args: {
    placeholder: 'Search...',
    showLeadIcon: true,
    size: 'medium',
    status: 'default',
  },
};

export const WithEndIcon: Story = {
  args: {
    placeholder: 'Input with end icon',
    showEndIcon: true,
    size: 'medium',
    status: 'default',
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Search with both icons',
    showLeadIcon: true,
    showEndIcon: true,
    size: 'medium',
    status: 'default',
  },
};

export const WithCustomIcons: Story = {
  args: {
    placeholder: 'Custom icons',
    showLeadIcon: true,
    showEndIcon: true,
    leadIcon: <MaterialIcon name="person" size={24} />,
    endIcon: <MaterialIcon name="visibility" size={24} />,
    size: 'medium',
    status: 'default',
  },
};

// Interactive Testing
export const FocusTest: Story = {
  args: {
    placeholder: 'Click to focus',
    size: 'medium',
    status: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);
  },
};

export const ErrorWithIcons: Story = {
  args: {
    value: 'invalid@email',
    placeholder: 'Enter email',
    showLeadIcon: true,
    status: 'error',
    size: 'medium',
  },
};

export const SuccessWithIcons: Story = {
  args: {
    value: 'valid@example.com',
    placeholder: 'Enter email',
    showLeadIcon: true,
    status: 'success',
    size: 'medium',
  },
};

// Accessibility Story
export const WithAccessibility: Story = {
  args: {
    placeholder: 'Enter your name',
    id: 'user-name',
    name: 'userName',
    size: 'medium',
    status: 'default',
  },
  render: (args) => (
    <div>
      <label htmlFor="user-name" style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
        Full Name *
      </label>
      <InputField
        {...args}
        aria-label="User name input field"
        aria-describedby="name-help-text"
      />
      <div id="name-help-text" style={{ fontSize: '12px', color: 'gray', marginTop: '4px' }}>
        Please enter your full name as it appears on your ID
      </div>
    </div>
  ),
};


// All Variants Showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
      {/* Default States */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          Default States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            placeholder="Default (no icons)"
            size="medium"
            status="default"
          />
          <InputField
            value="Filled state"
            placeholder="With value"
            size="medium"
            status="default"
          />
          <InputField
            placeholder="Disabled input"
            disabled={true}
            size="medium"
          />
        </div>
      </div>

      {/* Size Variants */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          Size Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            placeholder="Medium size (56px height)"
            size="medium"
            status="default"
          />
          <InputField
            placeholder="Small size (40px height)"
            size="small"
            status="default"
          />
        </div>
      </div>

      {/* Status States */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          System Status States
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            value="valid@example.com"
            placeholder="Enter email"
            status="success"
            size="medium"
          />
          <InputField
            value="invalid-email"
            placeholder="Enter email"
            status="error"
            size="medium"
          />
        </div>
      </div>

      {/* Icon Variants */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          Icon Variants
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            placeholder="With leading icon (search)"
            showLeadIcon={true}
            size="medium"
            status="default"
          />
          <InputField
            placeholder="With trailing icon (close)"
            showEndIcon={true}
            size="medium"
            status="default"
          />
          <InputField
            placeholder="With both icons"
            showLeadIcon={true}
            showEndIcon={true}
            size="medium"
            status="default"
          />
          <InputField
            placeholder="Custom icons"
            showLeadIcon={true}
            showEndIcon={true}
            leadIcon={<MaterialIcon name="person" size={24} />}
            endIcon={<MaterialIcon name="visibility" size={24} />}
            size="medium"
            status="default"
          />
        </div>
      </div>

      {/* Status + Icons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          Status States Replace End Icon
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <InputField
            value="valid@example.com"
            placeholder="Success replaces end icon"
            showLeadIcon={true}
            showEndIcon={true}
            status="success"
            size="medium"
          />
          <InputField
            value="invalid@email"
            placeholder="Error replaces end icon"
            showLeadIcon={true}
            showEndIcon={true}
            status="error"
            size="medium"
          />
        </div>
      </div>

      {/* All States with Small Size */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Inter', fontWeight: 600, fontSize: '16px' }}>
          Small Size Examples
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InputField
            placeholder="Small default"
            size="small"
            status="default"
          />
          <InputField
            placeholder="Small with icons"
            showLeadIcon={true}
            showEndIcon={true}
            size="small"
            status="default"
          />
          <InputField
            value="success@example.com"
            placeholder="Small success"
            size="small"
            status="success"
          />
          <InputField
            value="error@email"
            placeholder="Small error"
            size="small"
            status="error"
          />
        </div>
      </div>
    </div>
  ),
};