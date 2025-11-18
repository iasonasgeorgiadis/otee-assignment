import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text content */
  label?: string;
  /** The visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'link';
  /** The size of the button */
  size?: 'medium' | 'small';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button has an outlined style */
  outlined?: boolean;
  /** Link color scheme when variant is 'link' */
  linkColor?: 'primary' | 'secondary';
  /** Icon to display (maps to iconLead for compatibility) */
  icon?: React.ReactNode;
  /** Optional icon to display at the start */
  iconLead?: React.ReactNode;
  /** Optional icon to display at the end */
  iconEnd?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Button component that matches the Figma design system
 *
 * Link variant features:
 * - Animated underline that slides from left to right on hover
 * - Animation tokens: --igds-button-link-underline-height (3px)
 * - Animation tokens: --igds-button-link-transition-duration (300ms)
 * - Animation tokens: --igds-button-link-transition-timing (ease-in-out)
 */
export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  outlined = false,
  linkColor = 'primary',
  icon,
  iconLead,
  iconEnd,
  className = '',
  children,
  ...props
}) => {
  // Support legacy Figma export prop name `icon` by mapping it to the lead slot.
  const leadIcon = iconLead ?? icon;

  // Detect icon-only mode: no children and no label, but has an icon
  const isIconOnly = !children && !label && (leadIcon || iconEnd);

  // Warn if icon-only button lacks accessible label
  if (isIconOnly && !props['aria-label'] && !props['aria-labelledby']) {
    console.warn('Icon-only buttons should have aria-label or aria-labelledby for accessibility');
  }

  const classNames = [
    'igds-button',
    `igds-button--${variant}`,
    `igds-button--${size}`,
    // For link variant, add linkColor class for backwards compatibility
    variant === 'link' && `igds-button--link-${linkColor}`,
    outlined && 'igds-button--outlined',
    disabled && 'igds-button--disabled',
    isIconOnly && 'igds-button--icon-only',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {leadIcon && <span className="igds-button__icon-lead">{leadIcon}</span>}
      {!isIconOnly && <span className="igds-button__label">{children || label}</span>}
      {iconEnd && <span className="igds-button__icon-end">{iconEnd}</span>}
    </button>
  );
}; 
