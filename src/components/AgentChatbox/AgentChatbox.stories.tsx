import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AgentChatbox } from './AgentChatbox';

const meta: Meta<typeof AgentChatbox> = {
  title: 'Components/AgentChatbox',
  component: AgentChatbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Assistant-style chat input that mirrors the OTee design with active, hover, and filled states. Typing a value swaps the microphone for the send icon and pressing Enter injects the Figma reference copy.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    onSend: { action: 'send', table: { category: 'Events' } },
    onAccessoryClick: { action: 'accessory', table: { category: 'Events' } },
    onVoiceRequest: { action: 'voice', table: { category: 'Events' } },
  },
};

export default meta;
type Story = StoryObj<typeof AgentChatbox>;

export const Active: Story = {
  args: {
    placeholder: 'Ask anything',
  },
};

export const FilledPreview: Story = {
  render: () => {
    const [value, setValue] = useState('Summarize the safety checklist from the equipment manual I uploaded.');
    return (
      <AgentChatbox
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask anything"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled example locked to the filled copy from the design. Edits still animate the end icon.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    placeholder: 'Ask anything',
  },
  render: (args) => (
    <AgentChatbox
      {...args}
      onSend={(message) => {
        args.onSend?.(message);
        // Storybook action logging for demo purposes.
        console.log('AgentChatbox submission:', message);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Type, hover, and submit to preview the transitions. Press Enter or click the end button to inject the reference prompt.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Ask anything',
    disabled: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '420px' }}>
      <div>
        <p style={{ marginBottom: '8px', color: '#3c3e3f', fontWeight: 600 }}>Active</p>
        <AgentChatbox placeholder="Ask anything" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', color: '#3c3e3f', fontWeight: 600 }}>Hover & Filled</p>
        <AgentChatbox defaultValue="Summarize the safety checklist from the equipment manual I uploaded." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side preview of the default and filled states. Hover over the top instance to see the hover styling.',
      },
    },
  },
};
