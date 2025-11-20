import type { Meta, StoryObj } from '@storybook/react-vite';
import { AIKnowledgeBase } from './AIKnowledgeBase';
import { UploadView } from './UploadView';

const meta = {
  title: 'Components/AIKnowledgeBase',
  component: AIKnowledgeBase,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'AI Knowledge Base component that allows users to upload files and interact with AI-powered analysis.'
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '800px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AIKnowledgeBase>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * UploadView - Default upload state with disabled analyze button
 */
export const Upload: Story = {
  args: {
    initialScreen: 'upload',
    onFilesSelected: () => {},
    onAnalyze: () => {},
    onMessageSend: () => {},
    onDeleteFile: () => {},
    onEditConversationTitle: () => {},
    onSelectThread: () => {},
  },
};

/**
 * UploadView component in isolation
 */
export const UploadViewStory: StoryObj<typeof UploadView> = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '800px', height: '600px', background: '#fff', borderRadius: '16px', padding: '24px' }}>
      <UploadView onFilesSelected={() => {}} />
    </div>
  ),
  name: 'Upload View (Isolated)',
  parameters: {
    docs: {
      description: {
        story: 'The UploadView displays the initial upload screen with header, dropzone area, and disabled analyze button. Design Source: Figma Node ID 40016945-8043'
      },
    },
  },
};

/**
 * Empty state with no files
 */
export const Empty: Story = {
  args: {
    initialScreen: 'empty',
    onFilesSelected: () => {},
    onAnalyze: () => {},
    onMessageSend: () => {},
    onDeleteFile: () => {},
    onEditConversationTitle: () => {},
    onSelectThread: () => {},
  },
};

/**
 * Files list state with uploaded files
 */
export const FilesList: Story = {
  args: {
    initialScreen: 'files',
    files: [
      { id: '1', name: 'document.pdf', size: 1024000, uploadedAt: new Date().toISOString() },
      { id: '2', name: 'report.docx', size: 512000, uploadedAt: new Date().toISOString() },
      { id: '3', name: 'data.csv', size: 256000, uploadedAt: new Date().toISOString() },
    ],
    onFilesSelected: () => {},
    onAnalyze: () => {},
    onMessageSend: () => {},
    onDeleteFile: () => {},
    onEditConversationTitle: () => {},
    onSelectThread: () => {},
  },
};

/**
 * Chat state with conversation
 */
export const Chat: Story = {
  args: {
    initialScreen: 'chat',
    files: [
      { id: '1', name: 'document.pdf', size: 1024000, uploadedAt: new Date().toISOString() },
    ],
    messages: [
      { id: '1', content: 'What are the key findings in this document?', role: 'user', timestamp: new Date().toISOString() },
      { id: '2', content: 'Based on my analysis of the document, here are the key findings:\n\n1. Revenue increased by 15% year-over-year\n2. Customer satisfaction scores improved\n3. Market expansion into three new regions', role: 'assistant', timestamp: new Date().toISOString() },
    ],
    threads: [
      { id: '1', title: 'Document Analysis', lastMessage: 'Based on my analysis...', updatedAt: new Date().toISOString() },
    ],
    sidebarFiles: [
      { id: '1', name: 'document.pdf' },
    ],
    onFilesSelected: () => {},
    onAnalyze: () => {},
    onMessageSend: () => {},
    onDeleteFile: () => {},
    onEditConversationTitle: () => {},
    onSelectThread: () => {},
  },
};
