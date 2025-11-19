import type { FC, ReactNode } from 'react';
import { Chatbox } from '../Chatbox';
import { ChatMessage } from '../ChatMessage';
import { MaterialIcon } from '../MaterialIcon';
import { ChatSidebar } from './ChatSidebar';
import type { ChatThread, SidebarFile } from './ChatSidebar';

export interface Message {
  id: string;
  type: 'user-prompt' | 'ai-response';
  content: ReactNode;
}

export interface ChatViewProps {
  /** Array of chat threads for sidebar */
  chats: ChatThread[];
  /** Array of files for sidebar */
  files: SidebarFile[];
  /** Array of messages in the conversation */
  messages: Message[];
  /** Whether this is the conversation view with messages */
  hasConversation?: boolean;
  /** Conversation title (shown when hasConversation is true) */
  conversationTitle?: string;
  /** Callback when a message is submitted */
  onMessageSubmit: (message: string) => void;
  /** Custom class name */
  className?: string;
}

/**
 * ChatView displays the chat interface with sidebar and main content area.
 *
 * Design Source: Figma "AI Knowledge Base - Chat/Chat-Conversation" (Node ID: 40016943-6246)
 */
export const ChatView: FC<ChatViewProps> = ({
  chats,
  files,
  messages,
  hasConversation = false,
  conversationTitle = 'Safety Checklist Summary',
  onMessageSubmit,
  className = ''
}) => {
  const classNames = ['ai-kb-chat', className].filter(Boolean).join(' ');
  const hasMessages = messages.length > 0;

  return (
    <div className={classNames}>
      <ChatSidebar chats={chats} files={files} />

      <main className="ai-kb-chat__main">
        <header className="ai-kb-chat__header">
          <MaterialIcon
            name="auto_awesome"
            size={24}
            variant="outlined"
            className="ai-kb-chat__header-icon"
          />
          <div className="ai-kb-chat__header-text">
            <h2 className="ai-kb-chat__title">AI Knowledge Base</h2>
          </div>
        </header>

        <div className={`ai-kb-chat__content ${hasMessages ? 'ai-kb-chat__content--has-messages' : ''}`}>
          {hasMessages ? (
            <div className="ai-kb-chat__messages">
              {hasConversation && (
                <div className="ai-kb-chat__conversation-header">
                  <h3 className="ai-kb-chat__conversation-title">{conversationTitle}</h3>
                  <MaterialIcon
                    name="edit"
                    size={16}
                    variant="outlined"
                    className="ai-kb-chat__conversation-edit"
                  />
                </div>
              )}
              {messages.map((message) => (
                <ChatMessage key={message.id} type={message.type}>
                  {message.content}
                </ChatMessage>
              ))}
            </div>
          ) : (
            <span className="ai-kb-chat__start-text">Start a Conversation</span>
          )}
        </div>

        <footer className="ai-kb-chat__footer">
          <Chatbox
            placeholder="Ask anything"
            onSubmit={onMessageSubmit}
          />
        </footer>
      </main>
    </div>
  );
};

ChatView.displayName = 'ChatView';
