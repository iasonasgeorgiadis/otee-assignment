import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio buttons allow users to select one option from a set of mutually exclusive options.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label for the radio button',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the radio button is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Size variant of the radio button',
    },
    name: {
      control: 'text',
      description: 'Name attribute for grouping radio buttons',
    },
    value: {
      control: 'text',
      description: 'Value of the radio button',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the radio button state changes',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Radio Button',
    selected: false,
    disabled: false,
    size: 'medium',
    value: 'default',
  },
};

// Selected state
export const Selected: Story = {
  args: {
    label: 'Selected Radio Button',
    selected: true,
    disabled: false,
    size: 'medium',
    value: 'selected',
  },
};

// Disabled states
export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Button',
    selected: false,
    disabled: true,
    size: 'medium',
    value: 'disabled',
  },
};

export const DisabledSelected: Story = {
  args: {
    label: 'Disabled Selected Radio Button',
    selected: true,
    disabled: true,
    size: 'medium',
    value: 'disabled-selected',
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small Radio Button',
    selected: false,
    disabled: false,
    size: 'small',
    value: 'small',
  },
};

export const SmallSelected: Story = {
  args: {
    label: 'Small Selected Radio Button',
    selected: true,
    disabled: false,
    size: 'small',
    value: 'small-selected',
  },
};

// Interactive Radio Group
export const RadioGroup: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
          Choose your preferred option:
        </h3>
        <RadioButton
          label="Option 1"
          name="demo-group"
          value="option1"
          selected={selectedValue === 'option1'}
          onChange={setSelectedValue}
        />
        <RadioButton
          label="Option 2"
          name="demo-group"
          value="option2"
          selected={selectedValue === 'option2'}
          onChange={setSelectedValue}
        />
        <RadioButton
          label="Option 3"
          name="demo-group"
          value="option3"
          selected={selectedValue === 'option3'}
          onChange={setSelectedValue}
        />
        <RadioButton
          label="Option 4 (Disabled)"
          name="demo-group"
          value="option4"
          selected={selectedValue === 'option4'}
          onChange={setSelectedValue}
          disabled
        />
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f8f9fb',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#3c3e3f'
        }}>
          Selected value: <strong>{selectedValue}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio buttons in a group where only one option can be selected at a time.',
      },
    },
  },
};

// All States Overview
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', minWidth: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#6f7071' }}>
          MEDIUM SIZE
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RadioButton label="Default" size="medium" selected={false} disabled={false} value="medium-default" />
          <RadioButton label="Selected" size="medium" selected={true} disabled={false} value="medium-selected" />
          <RadioButton label="Disabled" size="medium" selected={false} disabled={true} value="medium-disabled" />
          <RadioButton label="Disabled Selected" size="medium" selected={true} disabled={true} value="medium-disabled-selected" />
        </div>
      </div>

      <div>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: '#6f7071' }}>
          SMALL SIZE
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <RadioButton label="Default" size="small" selected={false} disabled={false} value="small-default" />
          <RadioButton label="Selected" size="small" selected={true} disabled={false} value="small-selected" />
          <RadioButton label="Disabled" size="small" selected={false} disabled={true} value="small-disabled" />
          <RadioButton label="Disabled Selected" size="small" selected={true} disabled={true} value="small-disabled-selected" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all radio button states in both size variants.',
      },
    },
  },
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    selected: false,
    disabled: false,
    size: 'medium',
    value: 'no-label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radio button without a label - useful when the context provides sufficient description.',
      },
    },
  },
};