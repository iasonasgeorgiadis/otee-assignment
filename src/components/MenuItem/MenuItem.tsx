import React, { useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import './MenuItem.css';
import { Checkbox } from '../Checkbox/Checkbox';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

export interface MenuItemProps {
  /** The text label to display */
  label?: string;
  /** The variant of the menu item */
  variant?: 'text' | 'checkbox-left' | 'checkbox-right';
  /** Whether the menu item is selected */
  selected?: boolean;
  /** Whether the menu item is disabled */
  disabled?: boolean;
  /** Whether to show a checkmark icon when selected */
  showCheckmark?: boolean;
  /** Callback when the menu item is clicked or selection changes */
  onChange?: (selected: boolean) => void;
  /** Additional CSS class names */
  className?: string;
  /** Props to pass to the Checkbox component (only for checkbox variants) */
  checkboxProps?: Partial<React.ComponentProps<typeof Checkbox>>;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label = 'Label',
  variant = 'text',
  selected = false,
  disabled = false,
  showCheckmark = false,
  onChange,
  className = '',
  checkboxProps = {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isCheckboxVariant = variant === 'checkbox-left' || variant === 'checkbox-right';

  const { onChange: checkboxOnChange, ...restCheckboxProps } = checkboxProps;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    if (isCheckboxVariant) {
      const target = event.target as HTMLElement;
      if (target.closest('.igds-checkbox')) {
        return;
      }
    }

    onChange?.(!selected);
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setIsHovered(false);
    }
  };

  // Build container class names
  const containerClass = [
    'igds-menu-item',
    `igds-menu-item--${variant}`,
    selected ? 'igds-menu-item--selected' : '',
    isHovered ? 'igds-menu-item--hover' : '',
    disabled ? 'igds-menu-item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const textClass = `igds-menu-item__text ${
    disabled ? 'igds-menu-item__text--disabled' : ''
  }`.trim();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }

    event.preventDefault();
    onChange?.(!selected);
  };

  const role = 'menuitemcheckbox';
  const ariaChecked = selected;

  // For checkbox variants, render with Checkbox component
  if (isCheckboxVariant) {
    return (
      <div
        className={containerClass}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        role={role}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        aria-checked={ariaChecked}
      >
        <Checkbox
          {...restCheckboxProps}
          label={label}
          variant={selected ? 'checked' : 'unchecked'}
          disabled={disabled}
          checkboxPosition={variant === 'checkbox-left' ? 'left' : 'right'}
          size="small"
          onChange={(checkboxVariant) => {
            const nextSelected = checkboxVariant === 'checked';
            onChange?.(nextSelected);
            checkboxOnChange?.(checkboxVariant);
          }}
        />
      </div>
    );
  }

  // For text variant, render with optional checkmark icon
  return (
    <div
      className={containerClass}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role={role}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-checked={ariaChecked}
    >
      <span className={textClass}>{label}</span>
      {selected && showCheckmark && (
        <div className="igds-menu-item__icon">
          <MaterialIcon
            name="check"
            size={16}
            className="igds-menu-item__checkmark"
          />
        </div>
      )}
    </div>
  );
};
