import React, { useState, useEffect, ReactNode } from 'react';
import { MaterialIcon } from '../MaterialIcon';
import './RadioButton.css';

/**
 * Props for the RadioButton component
 */
export interface RadioButtonProps {
  /** The label content to display next to the radio button. Can be text or React elements */
  label?: ReactNode;
  /** Whether the radio button is currently selected */
  selected?: boolean;
  /** Whether the radio button is disabled and cannot be interacted with */
  disabled?: boolean;
  /** The size variant of the radio button. Affects font size and line height */
  size?: 'small' | 'medium';
  /** Callback function triggered when the radio button selection changes */
  onChange?: (value: string) => void;
  /** The name attribute for grouping radio buttons together */
  name?: string;
  /** The value associated with this radio button when selected */
  value?: string;
  /** Additional CSS classes to apply to the radio button container */
  className?: string;
  /** The id attribute for the radio button input element */
  id?: string;
}

/**
 * RadioButton component for single selection from multiple options.
 * Uses Material Icons for the radio button visual representation.
 *
 * @component
 * @example
 * // Basic usage
 * <RadioButton
 *   label="Option 1"
 *   value="option1"
 *   selected={selectedValue === 'option1'}
 *   onChange={handleChange}
 * />
 *
 * @example
 * // Disabled state
 * <RadioButton
 *   label="Disabled Option"
 *   value="disabled"
 *   disabled={true}
 * />
 */
export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(({
  label = 'Label',
  selected = false,
  disabled = false,
  size = 'medium',
  onChange,
  name,
  value = '',
  className = '',
  id,
}, ref) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  // Apply hover state from actual hover (unless disabled)
  const showHover = isHovered && !disabled;

  const containerClass = [
    'igds-radio-button',
    `igds-radio-button--size-${size}`,
    disabled ? 'igds-radio-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = `igds-radio-button__label ${
    disabled ? 'igds-radio-button__label--disabled' : ''
  }`.trim();

  const radioClass = `igds-radio-button__radio igds-radio-button__radio--${isSelected ? 'selected' : 'unselected'} ${
    showHover ? 'igds-radio-button__radio--hover' : ''
  } ${disabled ? 'igds-radio-button__radio--disabled' : ''}`.trim();

  // Determine which Material Icon to use based on state
  const getIconName = () => {
    if (isSelected) {
      return 'radio_button_checked';
    }
    return 'radio_button_unchecked';
  };

  return (
    <label
      className={containerClass}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      <input
        ref={ref}
        type="radio"
        className="igds-radio-button__input"
        checked={isSelected}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        value={value}
        id={id}
        aria-describedby={label ? undefined : 'radio-label'}
      />
      <MaterialIcon
        name={getIconName()}
        size={16}
        className={radioClass}
        variant="filled"
      />
      {label && <span className={labelClass}>{label}</span>}
    </label>
  );
});

RadioButton.displayName = 'RadioButton';