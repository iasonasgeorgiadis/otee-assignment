import React, { useState, useEffect, ReactNode } from 'react';
import './Checkbox.css';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

export interface CheckboxProps {
  label?: ReactNode;
  variant?: 'unchecked' | 'checked' | 'intermediate' | 'plus';
  disabled?: boolean;
  checkboxPosition?: 'left' | 'right';
  size?: 'small' | 'medium';
  onChange?: (variant: 'checked' | 'unchecked') => void;
  className?: string;
  /** Size for check/intermediate/plus icons */
  iconSize?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label = 'Label',
  variant = 'unchecked',
  disabled = false,
  checkboxPosition = 'left',
  size = 'medium',
  onChange,
  className = '',
  iconSize,
}) => {
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [isHovered, setIsHovered] = useState(false);

  const resolvedIconSize = iconSize ?? (size === 'medium' ? 20 : 16);

  useEffect(() => {
    setCurrentVariant(variant);
  }, [variant]);

  const handleClick = () => {
    if (!disabled && onChange && (currentVariant === 'unchecked' || currentVariant === 'checked')) {
      const newVariant = currentVariant === 'unchecked' ? 'checked' : 'unchecked';
      setCurrentVariant(newVariant);
      onChange(newVariant);
    }
  };

  // Apply hover state from actual hover (unless disabled)
  const showHover = isHovered && !disabled;

  const containerClass = [
    'igds-checkbox',
    `igds-checkbox--${checkboxPosition}`,
    `igds-checkbox--size-${size}`,
    disabled ? 'igds-checkbox--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClass = `igds-checkbox__label ${
    disabled ? 'igds-checkbox__label--disabled' : ''
  }`.trim();

  const checkboxClass = `igds-checkbox__box igds-checkbox__box--${currentVariant} ${
    showHover ? 'igds-checkbox__box--hover' : ''
  } ${disabled ? 'igds-checkbox__box--disabled' : ''}`.trim();

  const renderCheckIcon = () => {
    if (currentVariant === 'checked') {
      return (
        <MaterialIcon
          name="check"
          size={resolvedIconSize}
          className="igds-checkbox__icon"
        />
      );
    }
    if (currentVariant === 'intermediate') {
      return (
        <MaterialIcon
          name="remove"
          size={resolvedIconSize}
          className="igds-checkbox__icon"
        />
      );
    }
    if (currentVariant === 'plus') {
      return (
        <MaterialIcon
          name="add"
          size={resolvedIconSize}
          className="igds-checkbox__icon"
        />
      );
    }
    return null;
  };

  return (
    <label
      className={containerClass}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
    >
      <input
        type="checkbox"
        className="igds-checkbox__input"
        checked={currentVariant === 'checked'}
        disabled={disabled}
        onChange={handleClick}
        aria-checked={
          currentVariant === 'intermediate' ? 'mixed' :
          currentVariant === 'checked'
        }
      />
      {checkboxPosition === 'right' && label && <span className={labelClass}>{label}</span>}
      <span className={checkboxClass}>
        {renderCheckIcon()}
      </span>
      {checkboxPosition === 'left' && label && <span className={labelClass}>{label}</span>}
    </label>
  );
};
