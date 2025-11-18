import React, { useId, useState } from 'react';
import './InputField.css';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

export interface InputFieldProps {
  /** The current value of the input */
  value?: string;
  /** Placeholder text to display when input is empty */
  placeholder?: string;
  /** Size variant of the input field */
  size?: 'medium' | 'small';
  /** Status variant for system states */
  status?: 'default' | 'error' | 'success';
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether to show the leading icon */
  showLeadIcon?: boolean;
  /** Whether to show the trailing icon */
  showEndIcon?: boolean;
  /** Custom leading icon to display */
  leadIcon?: React.ReactNode;
  /** Custom trailing icon to display */
  endIcon?: React.ReactNode;
  /** Change handler for input value */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Additional CSS class names */
  className?: string;
  /** Input type attribute */
  type?: string;
  /** Input name attribute */
  name?: string;
  /** Input id attribute */
  id?: string;
  /** Accessible status message announced for error/success states */
  statusMessage?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
}

/**
 * InputField component that matches the Figma design system
 *
 * Features:
 * - Clean, minimal design with focus on usability
 * - Two sizes: medium (default) and small
 * - System status states: error and success
 * - Optional leading and trailing icons
 * - Default state has no icons (per Figma design)
 * - Error/Success states replace the end icon with status icon
 * - Hover and focus states handled via CSS pseudo-classes
 * - Fully accessible with proper ARIA attributes
 */
export const InputField: React.FC<InputFieldProps> = ({
  value = '',
  placeholder = 'Input',
  size = 'medium',
  status = 'default',
  disabled = false,
  showLeadIcon = false,
  showEndIcon = false,
  leadIcon,
  endIcon,
  onChange,
  className = '',
  type = 'text',
  name,
  id,
  statusMessage,
  defaultValue = '',
}) => {
  // Determine the size for icons based on the input size
  const iconSize = size === 'medium' ? 24 : 16;

  const generatedId = useId();
  const inputId = id || generatedId;
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value : internalValue;
  const defaultStatusMessage = status === 'error'
    ? 'There is a problem with this field.'
    : 'This field passed validation.';
  const computedStatusMessage = statusMessage || defaultStatusMessage;
  const shouldShowStatusMessage = status !== 'default';
  const statusMessageId = shouldShowStatusMessage ? `${inputId}-status` : undefined;


  // Determine if we have a value (for styling filled state)
  const hasValue = typeof currentValue === 'string' && currentValue.length > 0;

  // Build CSS classes
  const inputFieldClasses = [
    'igds-input-field',
    `igds-input-field--${size}`,
    status !== 'default' && `igds-input-field--${status}`,
    disabled && 'igds-input-field--disabled',
    hasValue && 'igds-input-field--filled',
    className
  ].filter(Boolean).join(' ');

  // Determine which icon to show at the end
  const getEndIcon = () => {
    // Status states override the end icon
    if (status === 'error') {
      return (
        <span className="igds-input-field__icon igds-input-field__icon--error" aria-hidden="true">
          <MaterialIcon name="error_outline" size={iconSize} />
        </span>
      );
    }
    if (status === 'success') {
      return (
        <span className="igds-input-field__icon igds-input-field__icon--success" aria-hidden="true">
          <MaterialIcon name="check_circle_outline" size={iconSize} />
        </span>
      );
    }

    // Show custom end icon if provided and showEndIcon is true
    if (showEndIcon && endIcon) {
      return <span className="igds-input-field__icon">{endIcon}</span>;
    }

    // Show default close icon if showEndIcon is true but no custom icon provided
    if (showEndIcon && !endIcon) {
      return (
        <span className="igds-input-field__icon" aria-hidden="true">
          <MaterialIcon name="close" size={iconSize} />
        </span>
      );
    }

    return null;
  };

  // Determine which icon to show at the start
  const getLeadIcon = () => {
    // Show custom lead icon if provided and showLeadIcon is true
    if (showLeadIcon && leadIcon) {
      return <span className="igds-input-field__icon">{leadIcon}</span>;
    }

    // Show default search icon if showLeadIcon is true but no custom icon provided
    if (showLeadIcon && !leadIcon) {
      return (
        <span className="igds-input-field__icon" aria-hidden="true">
          <MaterialIcon name="search" size={iconSize} />
        </span>
      );
    }

    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }

    onChange?.(event);
  };

  return (
    <div className={inputFieldClasses}>
      {getLeadIcon()}

      <input
        className="igds-input-field__input"
        type={type}
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        id={inputId}
        aria-invalid={status === 'error'}
        aria-describedby={statusMessageId}
      />

      {getEndIcon()}
      {statusMessageId && (
        <span
          id={statusMessageId}
          className="igds-input-field__status-message"
          aria-live={status === 'error' ? 'assertive' : 'polite'}
        >
          {computedStatusMessage}
        </span>
      )}
    </div>
  );
};
