import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';

const meta = {
  title: 'Components/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ChatMessage displays chat messages in a conversation interface.

## Design Source
Figma "messages" (Node ID: 40016946-2816)

## Variants
- **user-prompt**: User's input message with border styling
- **ai-response**: AI's response without border, supports rich text formatting

## Usage
\`\`\`tsx
// User prompt
<ChatMessage type="user-prompt">
  Your message here
</ChatMessage>

// AI response with rich content
<ChatMessage type="ai-response">
  <p><strong>Title</strong></p>
  <p>Description text</p>
  <ol>
    <li><strong>Item 1</strong></li>
  </ol>
</ChatMessage>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['user-prompt', 'ai-response'],
      description: 'The type of message',
    },
    children: {
      control: 'text',
      description: 'Message content',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '498px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserPrompt: Story = {
  args: {
    type: 'user-prompt',
    children: 'Summarize the safety checklist from the equipment manual I uploaded.',
  },
};

export const AIResponse: Story = {
  args: {
    type: 'ai-response',
    children: (
      <>
        <p><strong>Safety Checklist Summary (from Uploaded Manual)</strong></p>
        <p>Here's a simplified version of the safety checklist found in the equipment manual you uploaded:</p>
        <ol>
          <li>
            <strong>Power Isolation</strong>
            <ul>
              <li>Ensure the main power supply is disconnected before performing any installation, wiring, or maintenance.</li>
              <li>Verify lockout/tagout procedures are active.</li>
            </ul>
          </li>
        </ol>
        <ol start={2}>
          <li>
            <strong>Protective Equipment</strong>
            <ul>
              <li>Wear insulated gloves, eye protection, and safety footwear when operating or servicing the unit.</li>
              <li>Hearing protection is recommended during high-load operation.</li>
            </ul>
          </li>
        </ol>
        <ol start={3}>
          <li>
            <strong>Environmental Conditions</strong>
            <ul>
              <li>Operate only within the specified temperature and humidity ranges.</li>
              <li>Keep the area clear of dust, moisture, and flammable materials.</li>
            </ul>
          </li>
        </ol>
      </>
    ),
  },
};

export const AIResponseShort: Story = {
  name: 'AI Response (Short)',
  args: {
    type: 'ai-response',
    children: (
      <>
        <p><strong>Quick Answer</strong></p>
        <p>The main safety requirement is to disconnect power before any maintenance work.</p>
      </>
    ),
  },
};

export const UserPromptLong: Story = {
  name: 'User Prompt (Long)',
  args: {
    type: 'user-prompt',
    children: 'Can you analyze the equipment manual I uploaded and provide a detailed breakdown of all safety procedures, maintenance schedules, and operational guidelines? I need this information formatted as a checklist that I can use during our team training session next week.',
  },
};

export const ConversationExample: Story = {
  name: 'Conversation Flow',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ChatMessage type="user-prompt">
        Summarize the safety checklist from the equipment manual I uploaded.
      </ChatMessage>
      <ChatMessage type="ai-response">
        <>
          <p><strong>Safety Checklist Summary (from Uploaded Manual)</strong></p>
          <p>Here's a simplified version of the safety checklist found in the equipment manual you uploaded:</p>
          <ol>
            <li>
              <strong>Power Isolation</strong>
              <ul>
                <li>Ensure the main power supply is disconnected before performing any installation, wiring, or maintenance.</li>
                <li>Verify lockout/tagout procedures are active.</li>
              </ul>
            </li>
          </ol>
          <ol start={2}>
            <li>
              <strong>Protective Equipment</strong>
              <ul>
                <li>Wear insulated gloves, eye protection, and safety footwear when operating or servicing the unit.</li>
                <li>Hearing protection is recommended during high-load operation.</li>
              </ul>
            </li>
          </ol>
          <ol start={3}>
            <li>
              <strong>Environmental Conditions</strong>
              <ul>
                <li>Operate only within the specified temperature and humidity ranges.</li>
                <li>Keep the area clear of dust, moisture, and flammable materials.</li>
              </ul>
            </li>
          </ol>
        </>
      </ChatMessage>
    </div>
  ),
};
