import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

// Example icon component for demonstration
const ExampleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8s2.91 6.5 6.5 6.5 6.5-2.91 6.5-6.5S11.59 1.5 8 1.5zM11 9H9v2H7V9H5V7h2V5h2v2h2v2z"/>
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button component that matches the Figma design system with branded and neutral variants, multiple sizes, and outlined styles.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'link'],
      description: 'The visual style variant of the button',
    },
    linkColor: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Link color scheme when variant is link',
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'small'],
      description: 'The size of the button',
    },
    outlined: {
      control: { type: 'boolean' },
      description: 'Whether the button has an outlined style',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    label: {
      control: { type: 'text' },
      description: 'Button text content',
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Show icon in the button',
      mapping: {
        true: <MaterialIcon name="add" />,
        false: undefined,
      },
    },
    iconLead: {
      control: { type: 'boolean' },
      description: 'Show icon at the start of the button',
      mapping: {
        true: <ExampleIcon />,
        false: undefined,
      },
    },
    iconEnd: {
      control: { type: 'boolean' },
      description: 'Show icon at the end of the button',
      mapping: {
        true: <ExampleIcon />,
        false: undefined,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Button Stories
export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const PrimarySmall: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'small',
  },
};

export const PrimaryOutlined: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    outlined: true,
  },
};

export const PrimaryOutlinedSmall: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'small',
    outlined: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

export const PrimaryOutlinedDisabled: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    outlined: true,
    disabled: true,
  },
};

// Secondary Button Stories
export const Secondary: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'medium',
  },
};

export const SecondarySmall: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'small',
  },
};

export const SecondaryOutlined: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'medium',
    outlined: true,
  },
};

export const SecondaryOutlinedSmall: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'small',
    outlined: true,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'medium',
    disabled: true,
  },
};

export const SecondaryOutlinedDisabled: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'medium',
    outlined: true,
    disabled: true,
  },
};

// Button with Icons Stories
export const WithLeadIcon: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    iconLead: <ExampleIcon />,
  },
};

export const WithEndIcon: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    iconEnd: <ExampleIcon />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Button',
    variant: 'secondary',
    size: 'medium',
    iconLead: <ExampleIcon />,
    iconEnd: <ExampleIcon />,
  },
};

export const OutlinedWithIcon: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'medium',
    outlined: true,
    iconLead: <ExampleIcon />,
  },
};

// Icon-Only Button Stories (Circular buttons with no label)
export const IconOnlyPrimary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    icon: <MaterialIcon name="add" />,
    label: '', // Explicitly empty for icon-only
    'aria-label': 'Add item', // Accessibility requirement
  },
};

export const IconOnlyPrimarySmall: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    icon: <MaterialIcon name="add" />,
    label: '',
    'aria-label': 'Add item',
  },
};

export const IconOnlySecondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    icon: <MaterialIcon name="edit" />,
    label: '',
    'aria-label': 'Edit item',
  },
};

export const IconOnlySecondarySmall: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    icon: <MaterialIcon name="edit" />,
    label: '',
    'aria-label': 'Edit item',
  },
};

export const IconOnlyPrimaryOutlined: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    outlined: true,
    icon: <MaterialIcon name="keyboard_arrow_right" />,
    label: '',
    'aria-label': 'Next',
  },
};

export const IconOnlySecondaryOutlined: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    outlined: true,
    icon: <MaterialIcon name="more_vert" />,
    label: '',
    'aria-label': 'More options',
  },
};

export const IconOnlyPrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    icon: <MaterialIcon name="add" />,
    label: '',
    'aria-label': 'Add item',
  },
};

export const IconOnlySecondaryDisabled: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    disabled: true,
    icon: <MaterialIcon name="edit" />,
    label: '',
    'aria-label': 'Edit item',
  },
};

// Link Button Stories
export const LinkPrimary: Story = {
  args: {
    label: 'LINK',
    variant: 'link',
    linkColor: 'primary',
    size: 'medium',
  },
};

export const LinkSecondary: Story = {
  args: {
    label: 'LINK',
    variant: 'link',
    linkColor: 'secondary',
    size: 'medium',
  },
};

export const LinkSmall: Story = {
  args: {
    label: 'LINK',
    variant: 'link',
    linkColor: 'primary',
    size: 'small',
  },
};

export const LinkSecondarySmall: Story = {
  args: {
    label: 'LINK',
    variant: 'link',
    linkColor: 'secondary',
    size: 'small',
  },
};

export const LinkDisabled: Story = {
  args: {
    label: 'LINK',
    variant: 'link',
    linkColor: 'primary',
    size: 'medium',
    disabled: true,
  },
};

export const LinkSecondaryDisabled: Story = {
  args: {
    label: 'LINK',
    variant: 'link',
    linkColor: 'secondary',
    size: 'medium',
    disabled: true,
  },
};

// All Variants Story
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Branded Buttons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Primary Buttons</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="medium" label="Button" />
          <Button variant="primary" size="small" label="Button" />
          <Button variant="primary" size="medium" outlined label="Button" />
          <Button variant="primary" size="small" outlined label="Button" />
          <Button variant="primary" size="medium" disabled label="Button" />
          <Button variant="primary" size="medium" outlined disabled label="Button" />
        </div>
      </div>
      
      {/* Neutral Buttons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Secondary Buttons</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="secondary" size="medium" label="Button" />
          <Button variant="secondary" size="small" label="Button" />
          <Button variant="secondary" size="medium" outlined label="Button" />
          <Button variant="secondary" size="small" outlined label="Button" />
          <Button variant="secondary" size="medium" disabled label="Button" />
          <Button variant="secondary" size="medium" outlined disabled label="Button" />
        </div>
      </div>

      {/* Buttons with Icons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Buttons with Icons</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="medium" label="Button" iconLead={<ExampleIcon />} />
          <Button variant="primary" size="medium" label="Button" iconEnd={<ExampleIcon />} />
          <Button variant="secondary" size="medium" label="Button" iconLead={<ExampleIcon />} iconEnd={<ExampleIcon />} />
          <Button variant="primary" size="medium" outlined label="Button" iconLead={<ExampleIcon />} />
          <Button variant="secondary" size="small" label="Button" iconEnd={<ExampleIcon />} />
        </div>
      </div>

      {/* Buttons with Material Icons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Buttons with Material Icons</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button variant="primary" size="medium" label="Add" iconLead={<MaterialIcon name="add" />} />
          <Button variant="primary" size="medium" label="Save" iconEnd={<MaterialIcon name="save" />} />
          <Button variant="secondary" size="medium" label="Send" iconEnd={<MaterialIcon name="send" />} />
          <Button variant="secondary" size="medium" outlined label="Delete" iconLead={<MaterialIcon name="delete" />} />
          <Button variant="primary" size="small" label="Edit" iconLead={<MaterialIcon name="edit" />} />
          <Button variant="secondary" size="small" outlined label="Download" iconEnd={<MaterialIcon name="download" />} />
        </div>
      </div>

      {/* Icon-Only Buttons (Circular) */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Icon-Only Buttons (Circular)</h3>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" size="medium" icon={<MaterialIcon name="add" />} label="" aria-label="Add item" />
          <Button variant="primary" size="small" icon={<MaterialIcon name="add" />} label="" aria-label="Add item" />
          <Button variant="secondary" size="medium" icon={<MaterialIcon name="edit" />} label="" aria-label="Edit item" />
          <Button variant="secondary" size="small" icon={<MaterialIcon name="edit" />} label="" aria-label="Edit item" />
          <Button variant="primary" size="medium" outlined icon={<MaterialIcon name="keyboard_arrow_right" />} label="" aria-label="Next" />
          <Button variant="secondary" size="medium" outlined icon={<MaterialIcon name="more_vert" />} label="" aria-label="More options" />
          <Button variant="primary" size="medium" disabled icon={<MaterialIcon name="add" />} label="" aria-label="Add item" />
          <Button variant="secondary" size="medium" disabled icon={<MaterialIcon name="edit" />} label="" aria-label="Edit item" />
        </div>
      </div>

      {/* Link Buttons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Link Buttons</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Button variant="link" linkColor="primary" size="medium" label="LINK" />
          <Button variant="link" linkColor="primary" size="small" label="LINK" />
          <Button variant="link" linkColor="secondary" size="medium" label="LINK" />
          <Button variant="link" linkColor="secondary" size="small" label="LINK" />
          <Button variant="link" linkColor="primary" size="medium" disabled label="LINK" />
          <Button variant="link" linkColor="secondary" size="medium" disabled label="LINK" />
        </div>
      </div>

      {/* Link Buttons with Icons */}
      <div>
        <h3 style={{ marginBottom: '16px', fontFamily: 'sans-serif' }}>Link Buttons with Icons</h3>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <Button variant="link" linkColor="primary" size="medium" label="LINK" iconEnd={<MaterialIcon name="arrow_outward" />} />
          <Button variant="link" linkColor="primary" size="small" label="LINK" iconEnd={<MaterialIcon name="arrow_outward" />} />
          <Button variant="link" linkColor="secondary" size="medium" label="LINK" iconEnd={<MaterialIcon name="arrow_outward" />} />
          <Button variant="link" linkColor="secondary" size="small" label="LINK" iconEnd={<MaterialIcon name="arrow_outward" />} />
        </div>
      </div>
    </div>
  ),
};

// Material Icon Examples
export const MaterialIconExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button variant="primary" size="medium" label="Add New" iconLead={<MaterialIcon name="add_circle" />} />
        <Button variant="secondary" size="medium" label="Upload File" iconEnd={<MaterialIcon name="upload" />} />
        <Button variant="primary" size="medium" outlined label="Share" iconLead={<MaterialIcon name="share" />} />
        <Button variant="secondary" size="small" label="Settings" iconEnd={<MaterialIcon name="settings" />} />
      </div>
    </div>
  ),
}; 