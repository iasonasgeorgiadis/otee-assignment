import React, { useId, useRef, useState } from 'react';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './AgentChatbox.css';

const DEFAULT_PREFILL_MESSAGE = 'Summarize the safety checklist from the equipment manual I uploaded.';

export interface AgentChatboxProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'defaultValue' | 'onChange'
> {
  /** Current value when using the component in controlled mode */
  value?: string;
  /** Initial value when used in uncontrolled mode */
  defaultValue?: string;
  /** Placeholder text displayed before the user types */
  placeholder?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Callback fired whenever the text value changes */
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Callback fired when the user submits a prompt (click send or press Enter) */
  onSend?: (message: string) => void;
  /** Optional callback for the leading accessory button (plus icon) */
  onAccessoryClick?: () => void;
  /** Optional callback triggered when the mic icon is clicked while the field is empty */
  onVoiceRequest?: () => void;
  /** Additional custom class name */
  className?: string;
  /** Message that replaces the input once a submission succeeds (defaults to Figma copy) */
  prefillAfterSend?: string;
  /** Accessible label for the accessory button */
  addButtonLabel?: string;
  /** Accessible label when showing the microphone icon */
  microphoneLabel?: string;
  /** Accessible label when showing the send icon */
  sendLabel?: string;
}

/**
 * AgentChatbox replicates the OTee assistant input from Figma.
 * It supports both controlled and uncontrolled usage, swaps the end icon between
 * mic and send with an animated transition, and injects the Figma reference
 * message after submission for easier visual QA.
 */
export const AgentChatbox: React.FC<AgentChatboxProps> = ({
  value,
  defaultValue = '',
  placeholder = 'Ask anything',
  disabled = false,
  onChange,
  onSend,
  onAccessoryClick,
  onVoiceRequest,
  className = '',
  prefillAfterSend = DEFAULT_PREFILL_MESSAGE,
  addButtonLabel = 'Add attachment',
  microphoneLabel = 'Start voice input',
  sendLabel = 'Send message',
  rows = 1,
  onKeyDown,
  onFocus,
  onBlur,
  'aria-label': ariaLabel,
  ...textareaProps
}) => {
  const textareaId = useId();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const currentValue = isControlled ? value ?? '' : internalValue;
  const trimmedValue = currentValue.trim();
  const hasContent = trimmedValue.length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  const focusTextarea = () => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  };

  const handleSend = () => {
    if (disabled || !hasContent) {
      return;
    }

    onSend?.(trimmedValue);

    // Populate the Figma reference message so the filled state always matches the design.
    if (!isControlled) {
      setInternalValue(prefillAfterSend ?? trimmedValue);
    }
  };

  const handleEndButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (hasContent) {
      handleSend();
    } else {
      onVoiceRequest?.();
      focusTextarea();
    }
  };

  const handleAccessoryButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onAccessoryClick?.();
    focusTextarea();
  };

  const handleKeyDownInternal = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
    onKeyDown?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const rootClassName = [
    'igds-agent-chatbox',
    hasContent && 'igds-agent-chatbox--filled',
    disabled && 'igds-agent-chatbox--disabled',
    isFocused && 'igds-agent-chatbox--focused',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={rootClassName}
      onClick={focusTextarea}
      aria-disabled={disabled}
    >
      <button
        type="button"
        className="igds-agent-chatbox__icon-button igds-agent-chatbox__icon-button--start"
        aria-label={addButtonLabel}
        onClick={handleAccessoryButtonClick}
        disabled={disabled}
      >
        <MaterialIcon name="add" size={24} variant="outlined" />
      </button>

      <textarea
        ref={textareaRef}
        id={textareaId}
        rows={rows}
        className="igds-agent-chatbox__input"
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onKeyDown={handleKeyDownInternal}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
        {...textareaProps}
      />

      <button
        type="button"
        className="igds-agent-chatbox__icon-button igds-agent-chatbox__icon-button--end"
        aria-label={hasContent ? sendLabel : microphoneLabel}
        onClick={handleEndButtonClick}
        disabled={disabled}
      >
        <span className={`igds-agent-chatbox__icon igds-agent-chatbox__icon--mic ${hasContent ? 'igds-agent-chatbox__icon--hidden' : ''}`}>
          <MaterialIcon name="mic" size={24} variant="outlined" />
        </span>
        <span className={`igds-agent-chatbox__icon igds-agent-chatbox__icon--send ${hasContent ? '' : 'igds-agent-chatbox__icon--hidden'}`}>
          <MaterialIcon name="send" size={24} variant="outlined" />
        </span>
      </button>
    </div>
  );
};

AgentChatbox.displayName = 'AgentChatbox';
