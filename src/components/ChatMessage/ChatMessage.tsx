import React from 'react';
import './ChatMessage.css';

export type ChatMessageType = 'user-prompt' | 'ai-response';

export interface ChatMessageProps {
  /** The type of message - user prompt or AI response */
  type: ChatMessageType;
  /** The message content - can be a string or ReactNode for rich content */
  children: React.ReactNode;
  /** Optional custom class name */
  className?: string;
}

/**
 * ChatMessage component displays chat messages in a conversation interface.
 *
 * Two variants:
 * - user-prompt: User's input message with border styling
 * - ai-response: AI's response without border, supports rich text formatting
 *
 * Display behavior:
 * - User prompts show with a light grey border
 * - AI responses show without border and support formatted content (bold, lists)
 *
 * Design Source: Figma "messages" (Node ID: 40016946-2816)
 * Figma MCP Tools Used: get_design_context, get_variable_defs, get_screenshot, get_metadata, get_code_connect_map
 *
 * @example
 * // User prompt
 * <ChatMessage type="user-prompt">
 *   Summarize the safety checklist from the equipment manual I uploaded.
 * </ChatMessage>
 *
 * @example
 * // AI response with rich content
 * <ChatMessage type="ai-response">
 *   <p><strong>Safety Checklist Summary</strong></p>
 *   <p>Here's the summary:</p>
 *   <ol>
 *     <li><strong>Power Isolation</strong></li>
 *   </ol>
 * </ChatMessage>
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  children,
  className = '',
}) => {
  const classNames = [
    'igds-chat-message',
    `igds-chat-message--${type}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="article" aria-label={type === 'user-prompt' ? 'User message' : 'AI response'}>
      <div className="igds-chat-message__content">
        {children}
      </div>
    </div>
  );
};

ChatMessage.displayName = 'ChatMessage';
