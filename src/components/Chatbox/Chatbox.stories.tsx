import type { Meta, StoryObj } from '@storybook/react';
import { Chatbox } from './Chatbox';

const meta: Meta<typeof Chatbox> = {
  title: 'Components/Chatbox',
  component: Chatbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A chatbox input component for typing and submitting messages. Features smooth icon transitions and submit functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when empty',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chatbox is disabled',
    },
    onSubmit: {
      action: 'submitted',
      description: 'Callback when a message is submitted',
    },
    className: {
      control: 'text',
      description: 'Custom class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chatbox>;

/**
 * Default state of the chatbox (Active state in Figma).
 * Shows placeholder text and microphone icon.
 */
export const Default: Story = {
  args: {
    placeholder: 'Ask anything',
  },
};

/**
 * Interactive demo showing all states.
 * Type in the input to see the filled state with send button.
 * Press Enter or click send to submit.
 */
export const Interactive: Story = {
  args: {
    placeholder: 'Ask anything',
    onSubmit: (message) => {
      console.log('Message submitted:', message);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Type in the input to see the transition from microphone to send icon. Press Enter or click the send button to submit.',
      },
    },
  },
};

/**
 * Custom placeholder text.
 */
export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Type your question here...',
  },
};

/**
 * Disabled state of the chatbox.
 * The component is non-interactive.
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Ask anything',
    disabled: true,
  },
};

/**
 * Showcases different widths using custom styles.
 */
export const DifferentWidths: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '600px' }}>
      <Chatbox placeholder="Default width (400px max)" />
      <div style={{ maxWidth: '300px' }}>
        <Chatbox placeholder="Narrow (300px)" />
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Chatbox placeholder="Full width" />
      </div>
    </div>
  ),
};

/**
 * All states shown together for comparison.
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '8px', color: '#3c3e3f' }}>Active (Default)</h4>
        <Chatbox placeholder="Ask anything" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', color: '#3c3e3f' }}>Hover (mouse over to see)</h4>
        <Chatbox placeholder="Ask anything" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', color: '#3c3e3f' }}>Disabled</h4>
        <Chatbox placeholder="Ask anything" disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows Active and Disabled states. Hover over the chatboxes to see the hover state. Type in any chatbox to see the filled state with send button.',
      },
    },
  },
};
