import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
          'Flexible menu row used for text commands or checkbox-driven multi-select menus. Supports left/right checkbox placement, selection indicators, and disabled states with consistent hover and focus affordances.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'checkbox-left', 'checkbox-right'],
      description: 'Choose between plain text actions or checkbox-driven items.',
      table: {
        type: { summary: "'text' | 'checkbox-left' | 'checkbox-right'" },
        defaultValue: { summary: 'text' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Primary text shown inside the menu row.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    selected: {
      control: { type: 'boolean' },
      description: 'Marks the item as selected, showing a checkmark or checked checkbox.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the item, removing hover/focus feedback and keyboard activation.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onChange: {
      action: 'changed',
      control: false,
      description: 'Callback fired when selection toggles. Receives the next selected state.',
      table: {
        type: { summary: '(selected: boolean) => void' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Optional custom class for host applications to adjust layout.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
    checkboxProps: {
      control: { type: 'object' },
      description:
        'Props forwarded to the inner Checkbox when using checkbox variants (its `onChange` chains after the menu item handler).',
      table: {
        type: { summary: 'Partial<CheckboxProps>' },
        defaultValue: { summary: '{}' },
      },
    },
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stories
export const Default: Story = {
  args: {
    label: 'Menu Item',
    variant: 'text',
    selected: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default text variant menu item.',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Text variant with selected state showing a checkmark.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Text variant in disabled state preventing interaction.',
      },
    },
  },
};

// Checkbox variants
export const CheckboxLeft: Story = {
  args: {
    label: 'Checkbox Item',
    variant: 'checkbox-left',
    selected: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu item with checkbox positioned on the left side.',
      },
    },
  },
};

export const CheckboxLeftSelected: Story = {
  args: {
    label: 'Checkbox Item Selected',
    variant: 'checkbox-left',
    selected: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Selected checkbox-left variant showing checked state.',
      },
    },
  },
};

export const CheckboxRight: Story = {
  args: {
    label: 'Checkbox Item',
    variant: 'checkbox-right',
    selected: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu item with checkbox positioned on the right side.',
      },
    },
  },
};

export const CheckboxRightSelected: Story = {
  args: {
    label: 'Checkbox Item Selected',
    variant: 'checkbox-right',
    selected: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Selected checkbox-right variant showing checked state.',
      },
    },
  },
};

// Interactive example
export const Interactive = () => {
  const [textSelected, setTextSelected] = useState(false);
  const [checkboxLeftSelected, setCheckboxLeftSelected] = useState(false);
  const [checkboxRightSelected, setCheckboxRightSelected] = useState(true);

  return (
    <div style={{ width: 300, border: '1px solid #dadcdd', borderRadius: '2px' }}>
      <MenuItem
        label="Text Item"
        variant="text"
        selected={textSelected}
        onChange={setTextSelected}
      />
      <MenuItem
        label="Checkbox Left"
        variant="checkbox-left"
        selected={checkboxLeftSelected}
        onChange={setCheckboxLeftSelected}
      />
      <MenuItem
        label="Checkbox Right"
        variant="checkbox-right"
        selected={checkboxRightSelected}
        onChange={setCheckboxRightSelected}
      />
      <MenuItem
        label="Disabled Item"
        variant="text"
        disabled={true}
      />
    </div>
  );
};

Interactive.parameters = {
  docs: {
    description: {
      story: 'Interactive example showing all variants in a menu-like container. Click items to toggle their selection state.',
    },
  },
};
Interactive.storyName = 'Interactive Demo';

// State combinations
export const AllStates = () => (
  <div style={{ display: 'grid', gap: '8px', width: 300 }}>
    <h4>Text Variant</h4>
    <MenuItem label="Default" variant="text" />
    <MenuItem label="Selected" variant="text" selected />
    <MenuItem label="Disabled" variant="text" disabled />

    <h4>Checkbox Left</h4>
    <MenuItem label="Unchecked" variant="checkbox-left" />
    <MenuItem label="Checked" variant="checkbox-left" selected />
    <MenuItem label="Disabled" variant="checkbox-left" disabled />

    <h4>Checkbox Right</h4>
    <MenuItem label="Unchecked" variant="checkbox-right" />
    <MenuItem label="Checked" variant="checkbox-right" selected />
    <MenuItem label="Disabled" variant="checkbox-right" disabled />
  </div>
);

AllStates.parameters = {
  docs: {
    description: {
      story: 'Showcase of all MenuItem variants and states for easy comparison.',
    },
  },
};
AllStates.storyName = 'All States Overview';

// Long text example
export const LongText: Story = {
  args: {
    label: 'This is a very long menu item label that should be truncated with ellipsis when it exceeds the container width',
    variant: 'text',
  },
};

LongText.parameters = {
  docs: {
    description: {
      story: 'Example with long text to demonstrate text truncation behavior.',
    },
  },
};
LongText.storyName = 'Long Text Example';

// Menu-like container example
export const MenuContainer = () => (
  <div
    style={{
      width: 250,
      border: '1px solid #dadcdd',
      borderRadius: '2px',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
    }}
  >
    <MenuItem label="Cut" variant="text" />
    <MenuItem label="Copy" variant="text" />
    <MenuItem label="Paste" variant="text" disabled />
    <div style={{ height: '1px', backgroundColor: '#f2f3f5', margin: '4px 0' }} />
    <MenuItem label="Select All" variant="text" />
    <MenuItem label="Find" variant="text" />
    <div style={{ height: '1px', backgroundColor: '#f2f3f5', margin: '4px 0' }} />
    <MenuItem label="Show Hidden Files" variant="checkbox-left" />
    <MenuItem label="Show Extensions" variant="checkbox-left" selected />
  </div>
);

MenuContainer.parameters = {
  docs: {
    description: {
      story: 'Example showing MenuItems in a context menu-like container with separators and mixed variants.',
    },
  },
};
MenuContainer.storyName = 'Menu Container Example';

// Stretched width example for checkbox-right variant
export const StretchedWidth = () => (
  <div style={{ display: 'grid', gap: '16px', width: '100%', maxWidth: 400 }}>
    <h4>Checkbox Right - Stretched Width</h4>
    <div style={{ border: '1px solid #dadcdd', borderRadius: '2px', backgroundColor: 'white' }}>
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
      <MenuItem label="Label" variant="checkbox-right" />
    </div>
  </div>
);

StretchedWidth.parameters = {
  docs: {
    description: {
      story: 'Example showing checkbox-right MenuItems stretched to full width, matching the Figma design pattern.',
    },
  },
};
StretchedWidth.storyName = 'Stretched Width Checkbox Right';
