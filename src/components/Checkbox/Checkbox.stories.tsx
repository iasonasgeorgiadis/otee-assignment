import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox component with four variants (unchecked, checked, intermediate, plus), left/right positioning options, and small/medium typographic presets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label text for the checkbox',
    },
    variant: {
      control: { type: 'select' },
      options: ['unchecked', 'checked', 'intermediate', 'plus'],
      description: 'The variant of the checkbox',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
    },
    checkboxPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'The position of the checkbox relative to the label',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Typographic scale and spacing preset. Medium is the design-system default.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when checkbox variant changes (only for unchecked/checked)',
    },
    iconSize: {
      control: { type: 'number', min: 8, max: 32, step: 2 },
      description: 'Size of the icons in pixels',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    variant: 'unchecked',
    disabled: false,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked',
    variant: 'checked',
    disabled: false,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const Intermediate: Story = {
  args: {
    label: 'Intermediate (minus)',
    variant: 'intermediate',
    disabled: false,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const Plus: Story = {
  args: {
    label: 'Plus variant',
    variant: 'plus',
    disabled: false,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const RightAligned: Story = {
  args: {
    label: 'Right aligned',
    variant: 'unchecked',
    disabled: false,
    checkboxPosition: 'right',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    variant: 'unchecked',
    disabled: true,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    variant: 'checked',
    disabled: true,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const DisabledIntermediate: Story = {
  args: {
    label: 'Disabled intermediate',
    variant: 'intermediate',
    disabled: true,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const DisabledPlus: Story = {
  args: {
    label: 'Disabled plus',
    variant: 'plus',
    disabled: true,
    checkboxPosition: 'left',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    label: 'Small label',
    variant: 'checked',
    disabled: false,
    checkboxPosition: 'left',
    size: 'small',
  },
};

export const Interactive: Story = {
  args: {
    disabled: false,
    checkboxPosition: 'left',
  },
  render: (args) => {
    const [leftVariant, setLeftVariant] = useState<'checked' | 'unchecked'>('unchecked');
    const [rightVariant, setRightVariant] = useState<'checked' | 'unchecked'>('unchecked');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          {...args}
          label="Click me!"
          variant={leftVariant}
          onChange={setLeftVariant}
          size="medium"
        />
        <Checkbox
          {...args}
          label="Right aligned interactive"
          checkboxPosition="right"
          variant={rightVariant}
          onChange={setRightVariant}
          size="small"
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const variants: Array<'unchecked' | 'checked' | 'intermediate' | 'plus'> =
      ['unchecked', 'checked', 'intermediate', 'plus'];
    const disabledStates = [false, true];
    const positions: Array<'left' | 'right'> = ['left', 'right'];
    const sizes: Array<'medium' | 'small'> = ['medium', 'small'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', fontFamily: 'Open Sans, sans-serif', fontSize: '18px' }}>
          All Checkbox Variants
        </h3>

        {sizes.map((size) => (
          <div key={size}>
            <h4
              style={{
                marginBottom: '12px',
                fontFamily: 'Open Sans, sans-serif',
                fontSize: '16px',
                color: '#3c3e3f',
                textTransform: 'capitalize',
              }}
            >
              {size === 'medium' ? 'Medium (default)' : 'Small'}
            </h4>

            {disabledStates.map((isDisabled) => (
              <div key={`${size}-${isDisabled ? 'disabled' : 'enabled'}`} style={{ marginBottom: '24px' }}>
                <h5
                  style={{
                    marginBottom: '12px',
                    fontFamily: 'Open Sans, sans-serif',
                    fontSize: '14px',
                    color: '#3c3e3f',
                  }}
                >
                  {isDisabled ? 'Disabled States' : 'Enabled States (hover to preview hover)'}
                </h5>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(140px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {variants.map((variant) => (
                    <div
                      key={`${size}-${variant}-${isDisabled ? 'disabled' : 'enabled'}`}
                      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                    >
                      <div
                        style={{
                          fontFamily: 'Open Sans, sans-serif',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#6f7071',
                          textTransform: 'capitalize',
                          textAlign: 'center',
                        }}
                      >
                        {variant}
                      </div>
                      {positions.map((position) => (
                        <Checkbox
                          key={`${size}-${variant}-${position}-${isDisabled ? 'disabled' : 'enabled'}`}
                          label={position === 'left' ? 'Left label' : 'Right label'}
                          variant={variant}
                          disabled={isDisabled}
                          checkboxPosition={position}
                          size={size}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

export const FigmaComparison: Story = {
  render: () => {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        fontFamily: 'Open Sans, sans-serif'
      }}>
        <h3 style={{ fontSize: '18px', color: '#3c3e3f', marginBottom: '8px' }}>
          Figma Design Implementation
        </h3>
        <p style={{ fontSize: '14px', color: '#6f7071', marginBottom: '16px' }}>
          This implementation matches the Figma design specifications exactly, using Material Icons
          and design tokens for better maintainability.
        </p>

        {/* Medium Default State Row */}
        <div>
          <h4 style={{ fontSize: '14px', color: '#3c3e3f', marginBottom: '12px' }}>Medium (default) State</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox variant="unchecked" label="Unchecked" checkboxPosition="left" size="medium" />
            <Checkbox variant="checked" label="Checked" checkboxPosition="left" size="medium" />
            <Checkbox variant="intermediate" label="Intermediate" checkboxPosition="left" size="medium" />
            <Checkbox variant="plus" label="Plus" checkboxPosition="left" size="medium" />
          </div>
        </div>

        {/* Small State Row */}
        <div>
          <h4 style={{ fontSize: '14px', color: '#3c3e3f', marginBottom: '12px' }}>Small State</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox variant="unchecked" label="Unchecked" checkboxPosition="left" size="small" />
            <Checkbox variant="checked" label="Checked" checkboxPosition="left" size="small" />
            <Checkbox variant="intermediate" label="Intermediate" checkboxPosition="left" size="small" />
            <Checkbox variant="plus" label="Plus" checkboxPosition="left" size="small" />
          </div>
        </div>

        {/* Right Position Row */}
        <div>
          <h4 style={{ fontSize: '14px', color: '#3c3e3f', marginBottom: '12px' }}>Right Position</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox variant="unchecked" label="Unchecked" checkboxPosition="right" size="medium" />
            <Checkbox variant="checked" label="Checked" checkboxPosition="right" size="medium" />
            <Checkbox variant="intermediate" label="Intermediate" checkboxPosition="right" size="medium" />
            <Checkbox variant="plus" label="Plus" checkboxPosition="right" size="medium" />
          </div>
        </div>

        {/* Disabled State Row */}
        <div>
          <h4 style={{ fontSize: '14px', color: '#3c3e3f', marginBottom: '12px' }}>Disabled State</h4>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Checkbox variant="unchecked" label="Unchecked" disabled checkboxPosition="left" size="medium" />
            <Checkbox variant="checked" label="Checked" disabled checkboxPosition="left" size="medium" />
            <Checkbox variant="intermediate" label="Intermediate" disabled checkboxPosition="left" size="medium" />
            <Checkbox variant="plus" label="Plus" disabled checkboxPosition="left" size="medium" />
          </div>
        </div>
      </div>
    );
  },
};
