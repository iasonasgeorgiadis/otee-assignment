import React, { useState, useRef } from 'react';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './Chatbox.css';

export interface ChatboxProps {
  /** Placeholder text displayed when empty */
  placeholder?: string;
  /** Callback when a message is submitted */
  onSubmit?: (message: string) => void;
  /** Whether the chatbox is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Chatbox component that allows users to type and submit messages.
 *
 * Features:
 * - Smooth icon transition between microphone (empty) and send (filled)
 * - Submit on Enter key or click send button
 * - Hover state with background color change
 * - Full pill shape design
 *
 * Design Source: Figma "chatbox" (Node ID: 40001249-247)
 * Figma MCP Tools Used: get_design_context, get_variable_defs, get_screenshot, get_metadata, get_code_connect_map
 *
 * @example
 * <Chatbox
 *   placeholder="Ask anything"
 *   onSubmit={(message) => console.log(message)}
 * />
 */
export const Chatbox: React.FC<ChatboxProps> = ({
  placeholder = 'Ask anything',
  onSubmit,
  disabled = false,
  className = '',
}) => {
  const [value, setValue] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFilled = value.trim().length > 0;

  const handleSubmit = () => {
    if (isFilled && !disabled) {
      onSubmit?.(value.trim());
      // Show the predefined message after submit
      setValue('Summarize the safety checklist from the equipment manual I uploaded.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const classNames = [
    'igds-chatbox',
    isFilled && 'igds-chatbox--filled',
    isHovered && !isFilled && 'igds-chatbox--hover',
    disabled && 'igds-chatbox--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      role="search"
      aria-label="Chat input"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleContainerClick}
    >
      <div className="igds-chatbox__inner">
        {/* Icon Start - Plus button */}
        <button
          type="button"
          className="igds-chatbox__icon-start"
          aria-label="Add attachment"
          disabled={disabled}
          tabIndex={-1}
        >
          <MaterialIcon name="add" size={24} variant="outlined" />
        </button>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          className="igds-chatbox__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Chat message"
        />

        {/* Icon End - Mic or Send button */}
        <button
          type="button"
          className="igds-chatbox__icon-end"
          onClick={(e) => {
            e.stopPropagation();
            if (isFilled) {
              handleSubmit();
            }
          }}
          aria-label={isFilled ? 'Send message' : 'Voice input'}
          disabled={disabled}
        >
          <span className={`igds-chatbox__icon-mic ${isFilled ? 'igds-chatbox__icon--hidden' : ''}`}>
            <MaterialIcon name="mic" size={24} variant="outlined" />
          </span>
          <span className={`igds-chatbox__icon-send ${isFilled ? '' : 'igds-chatbox__icon--hidden'}`}>
            <MaterialIcon name="send" size={24} variant="outlined" />
          </span>
        </button>
      </div>
    </div>
  );
};

Chatbox.displayName = 'Chatbox';
