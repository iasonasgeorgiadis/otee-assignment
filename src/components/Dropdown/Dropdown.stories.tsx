import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown, DropdownItem } from './Dropdown';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A dropdown component that supports text-only items, checkboxes on the left, and checkboxes on the right. Based on the Figma design system.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '500px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'selected', 'checkbox-left', 'checkbox-right'],
      description: 'The variant of the dropdown',
    },
    open: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown is open (controlled)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown is disabled',
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Maximum height of the dropdown',
    },
    minWidth: {
      control: { type: 'text' },
      description: 'Minimum width of the dropdown',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Sample data
const sampleItems: DropdownItem[] = [
  { id: '1', label: 'Option 1' },
  { id: '2', label: 'Option 2' },
  { id: '3', label: 'Option 3' },
  { id: '4', label: 'Option 4' },
  { id: '5', label: 'Option 5' },
  { id: '6', label: 'Option 6' },
  { id: '7', label: 'Option 7' },
  { id: '8', label: 'Option 8' },
  { id: '9', label: 'Option 9' },
];

const longListItems: DropdownItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i + 1}`,
  label: `Option ${i + 1}`,
  selected: i % 5 === 0, // Some items pre-selected
}));

// Interactive wrapper component for stories
const DropdownWrapper = ({ children, ...props }: any) => {
  const [items, setItems] = useState(props.items || sampleItems);

  const handleSelect = (item: DropdownItem, index: number) => {
    console.log('Selected:', item, 'at index:', index);

    // Update items for checkbox variants and selected variant
    if (props.variant === 'selected') {
      // For selected variant, allow multiple selections with toggle behavior
      // Each item can be independently selected/deselected
      const updatedItems = [...items];
      updatedItems[index] = { ...item }; // Update only the clicked item with its toggled state
      setItems(updatedItems);
    } else if (props.variant !== 'text') {
      // For checkbox variants, update the specific item
      const updatedItems = [...items];
      updatedItems[index] = { ...item };
      setItems(updatedItems);
    }
  };

  const handleOpenChange = (open: boolean) => {
    console.log('Dropdown opened:', open);
  };

  return (
    <Dropdown
      {...props}
      items={items}
      onOpenChange={handleOpenChange}
      onSelect={handleSelect}
    >
      {children}
    </Dropdown>
  );
};

// Default story - Text variant
export const Default: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Select Option</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: sampleItems,
  },
};

// Checkbox Left variant
export const CheckboxLeft: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Select Multiple</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'checkbox-left',
    items: sampleItems.map((item, index) => ({
      ...item,
      selected: index < 2, // Pre-select first 2 items
    })),
  },
};

// Checkbox Right variant
export const CheckboxRight: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Choose Options</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'checkbox-right',
    items: sampleItems.map((item, index) => ({
      ...item,
      selected: index === 2, // Pre-select one item
    })),
  },
};

// Selected variant with checkmarks
export const SelectedVariant: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="primary">Select Option</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'selected',
    items: sampleItems.map((item, index) => ({
      ...item,
      selected: index === 1, // Pre-select "Option 2"
    })),
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown variant that shows checkmarks for selected items. Only one item can be selected at a time (single-select), and the dropdown remains open for easy selection changes.',
      },
    },
  },
};

// Long list with scrolling
export const LongList: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Select from Many</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: longListItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown with many items to demonstrate scrolling behavior.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

// With disabled items
export const WithDisabledItems: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Select Available</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: [
      { id: '1', label: 'Available Option 1' },
      { id: '2', label: 'Available Option 2' },
      { id: '3', label: 'Disabled Option', disabled: true },
      { id: '4', label: 'Available Option 3' },
      { id: '5', label: 'Another Disabled', disabled: true },
      { id: '6', label: 'Available Option 4' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown with some disabled items that cannot be selected.',
      },
    },
  },
};

// With dividers
export const WithDividers: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Grouped Options</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: [
      { id: '1', label: 'File', divider: true },
      { id: '2', label: 'New File' },
      { id: '3', label: 'Open File', divider: true },
      { id: '4', label: 'Edit' },
      { id: '5', label: 'Copy' },
      { id: '6', label: 'Paste', divider: true },
      { id: '7', label: 'Help' },
      { id: '8', label: 'About' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown with dividers to group related options.',
      },
    },
  },
};

// Disabled dropdown
export const Disabled: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary" disabled>
        Disabled Dropdown
      </Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: sampleItems,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled dropdown that cannot be opened or interacted with.',
      },
    },
  },
};

// Custom sizing
export const CustomSize: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Custom Size</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: longListItems,
    maxHeight: '200px',
    minWidth: '320px',
  },
  parameters: {
    docs: {
      description: {
        story: 'A dropdown with custom height and width dimensions.',
      },
    },
  },
};

// Keyboard navigation demo
export const KeyboardNavigationDemo: Story = {
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px' }}>
        <strong>Keyboard Navigation:</strong>
        <br />
        • Arrow keys: Navigate through options
        <br />
        • Enter/Space: Select option or open dropdown
        <br />
        • Escape: Close dropdown
        <br />
        • Tab: Move to next focusable element
      </p>
      <DropdownWrapper {...args}>
        <Button variant="secondary">Try Keyboard Navigation</Button>
      </DropdownWrapper>
    </div>
  ),
  args: {
    variant: 'text',
    items: sampleItems.slice(0, 5), // Fewer items for clearer demo
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates keyboard navigation capabilities. Click the button and use arrow keys to navigate.',
      },
    },
  },
};

// Click to expand demo
export const ClickToExpand: Story = {
  render: (args) => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px' }}>
        <strong>Click the button to expand/collapse the dropdown:</strong>
      </p>
      <DropdownWrapper {...args}>
        <Button variant="primary">Click to Expand</Button>
      </DropdownWrapper>
    </div>
  ),
  args: {
    variant: 'text',
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the click-to-expand functionality. Click the button to open/close the dropdown.',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  render: (args) => (
    <DropdownWrapper {...args}>
      <Button variant="secondary">Interactive Dropdown</Button>
    </DropdownWrapper>
  ),
  args: {
    variant: 'text',
    items: sampleItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive playground to test different dropdown configurations.',
      },
    },
  },
};
