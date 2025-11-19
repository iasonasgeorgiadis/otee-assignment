import type { FC, ReactNode } from 'react';
import { useState, useCallback } from 'react';
import './AIKnowledgeBase.css';
import { EmptyView } from './EmptyView';
import { UploadView } from './UploadView';
import { FilesListView } from './FilesListView';
import { ChatView } from './ChatView';
import type { FileData } from './FilesListView';
import type { Message } from './ChatView';
import type { ChatThread, SidebarFile } from './ChatSidebar';

export type AIKnowledgeBaseScreen = 'empty' | 'upload' | 'filesList' | 'chat' | 'chat-conversation';

export interface AIKnowledgeBaseProps {
  /** Initial screen state */
  defaultScreen?: AIKnowledgeBaseScreen;
  /** Controlled screen state */
  screen?: AIKnowledgeBaseScreen;
  /** Callback when screen changes */
  onScreenChange?: (screen: AIKnowledgeBaseScreen) => void;
  /** Custom class name */
  className?: string;
}

// Mock data matching Figma design exactly
const MOCK_FILES: FileData[] = [
  {
    id: '1',
    name: 'document-file.pdf',
    size: '82.0 KB',
    icon: 'picture_as_pdf',
    iconVariant: 'outlined'
  },
  {
    id: '2',
    name: 'spreadsheet-data.xlsx',
    size: '256.3 KB',
    icon: 'table_chart',
    iconVariant: 'outlined'
  }
];

const MOCK_CHATS: ChatThread[] = [
  { id: '1', title: 'Safety Checklist Summary – Packaging Line PLC' },
  { id: '2', title: 'Troubleshooting Error E-153 on Siemens S7-1200' },
  { id: '3', title: 'Extracted Modbus Register Mapping from VFD Manual' },
  { id: '4', title: 'Startup Sequence Guidance for Hydraulic Press System' }
];

const MOCK_SIDEBAR_FILES: SidebarFile[] = [
  { id: '1', name: 'document-file.pdf' },
  { id: '2', name: 'spreadsheet-data.xlsx' }
];

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'user-prompt',
    content: 'Summarize the safety checklist from the equipment manual I uploaded.'
  },
  {
    id: '2',
    type: 'ai-response',
    content: (
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
          <li>
            <strong>Protective Equipment</strong>
            <ul>
              <li>Wear insulated gloves, eye protection, and safety footwear when operating or servicing the unit.</li>
              <li>Hearing protection is recommended during high-load operation.</li>
            </ul>
          </li>
          <li>
            <strong>Environmental Conditions</strong>
            <ul>
              <li>Operate only within the specified temperature and humidity ranges.</li>
              <li>Keep the area clear of dust, moisture, and flammable materials.</li>
            </ul>
          </li>
        </ol>
      </>
    )
  }
];

/**
 * AIKnowledgeBase is the main orchestrator component that manages the different
 * screens of the AI Knowledge Base flow.
 *
 * Design Source: Figma "AI Knowledge Base" (Node ID: 40016943-6246)
 * Figma MCP Tools Used: get_design_context, get_variable_defs, get_screenshot, get_metadata, get_code_connect_map
 *
 * Screen States:
 * - empty: Initial state with centered dropzone card
 * - upload: Upload screen with header and dropzone
 * - filesList: List of uploaded files with analyze button
 * - chat: Chat interface with sidebar and input
 * - chat-conversation: Chat with populated messages
 *
 * @example
 * <AIKnowledgeBase defaultScreen="empty" />
 */
export const AIKnowledgeBase: FC<AIKnowledgeBaseProps> = ({
  defaultScreen = 'empty',
  screen: controlledScreen,
  onScreenChange,
  className = ''
}) => {
  const [internalScreen, setInternalScreen] = useState<AIKnowledgeBaseScreen>(defaultScreen);
  const [files, setFiles] = useState<FileData[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const currentScreen = controlledScreen ?? internalScreen;

  const changeScreen = useCallback((newScreen: AIKnowledgeBaseScreen) => {
    if (!controlledScreen) {
      setInternalScreen(newScreen);
    }
    onScreenChange?.(newScreen);
  }, [controlledScreen, onScreenChange]);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    // Convert File objects to FileData
    const newFiles: FileData[] = selectedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: formatFileSize(file.size),
      icon: getFileIcon(file.name),
      iconVariant: 'outlined' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);
    changeScreen('filesList');
  }, [changeScreen]);

  const handleCreateClick = useCallback(() => {
    changeScreen('upload');
  }, [changeScreen]);

  const handleAnalyze = useCallback(() => {
    // Use mock data for the demo
    setFiles(MOCK_FILES);
    changeScreen('chat');

    // After a short delay, show the conversation
    setTimeout(() => {
      setMessages(MOCK_MESSAGES);
      changeScreen('chat-conversation');
    }, 1000);
  }, [changeScreen]);

  const handleAddMore = useCallback(() => {
    // In a real app, this would open a file picker
    // For demo, we'll just go back to upload state temporarily
    changeScreen('upload');
  }, [changeScreen]);

  const handleRemoveFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const handleMessageSubmit = useCallback((message: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user-prompt',
      content: message
    };
    setMessages(prev => [...prev, newMessage]);

    // If this is the first message, transition to conversation view
    if (currentScreen === 'chat') {
      changeScreen('chat-conversation');
    }
  }, [currentScreen, changeScreen]);

  const classNames = ['ai-knowledge-base', className].filter(Boolean).join(' ');

  // Get the files and chats for the chat views
  const displayFiles = files.length > 0 ? files : MOCK_FILES;
  const sidebarFiles: SidebarFile[] = displayFiles.map(f => ({ id: f.id, name: f.name }));

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'empty':
        return (
          <EmptyView
            onFilesSelected={handleFilesSelected}
            onCreateClick={handleCreateClick}
          />
        );

      case 'upload':
        return (
          <UploadView
            onFilesSelected={handleFilesSelected}
          />
        );

      case 'filesList':
        return (
          <FilesListView
            files={displayFiles}
            onAnalyze={handleAnalyze}
            onAddMore={handleAddMore}
            onRemoveFile={handleRemoveFile}
          />
        );

      case 'chat':
        return (
          <ChatView
            chats={MOCK_CHATS}
            files={sidebarFiles}
            messages={[]}
            onMessageSubmit={handleMessageSubmit}
          />
        );

      case 'chat-conversation':
        return (
          <ChatView
            chats={MOCK_CHATS}
            files={sidebarFiles}
            messages={messages.length > 0 ? messages : MOCK_MESSAGES}
            hasConversation={true}
            conversationTitle="Safety Checklist Summary"
            onMessageSubmit={handleMessageSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={classNames}>
      {renderCurrentScreen()}
    </div>
  );
};

AIKnowledgeBase.displayName = 'AIKnowledgeBase';

// Helper functions
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileIcon(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return 'picture_as_pdf';
    case 'xlsx':
    case 'xls':
    case 'csv':
      return 'table_chart';
    case 'doc':
    case 'docx':
      return 'description';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'image';
    default:
      return 'insert_drive_file';
  }
}
