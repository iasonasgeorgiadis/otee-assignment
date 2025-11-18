import React from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'neutral' | 'link';
type ButtonSize = 'medium' | 'small';
type LinkColor = 'primary' | 'secondary';

type SharedButtonProps = {
  /** Button text content */
  label?: string;
  /** The size of the button */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button has an outlined style */
  outlined?: boolean;
  /** Whether the button has a ghost style (transparent background) */
  ghost?: boolean;
  /** Icon to display (maps to iconLead for compatibility) */
  icon?: React.ReactNode;
  /** Optional icon to display at the start */
  iconLead?: React.ReactNode;
  /** Optional icon to display at the end */
  iconEnd?: React.ReactNode;
  /** Custom class name */
  className?: string;
};

type NonLinkProps = SharedButtonProps & {
  /** The visual style variant of the button */
  variant?: Exclude<ButtonVariant, 'link'>;
  linkColor?: never;
};

type LinkProps = SharedButtonProps & {
  variant: 'link';
  /** Link color scheme when variant is 'link' */
  linkColor?: LinkColor;
};

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
>;

export type ButtonProps = (NonLinkProps | LinkProps) &
  NativeButtonProps &
  React.PropsWithChildren;

/**
 * Button component that matches the Figma design system
 *
 * Link variant features:
 * - Animated underline that slides from left to right on hover
 * - Animation tokens: --igds-button-link-underline-height (3px)
 * - Animation tokens: --igds-button-link-transition-duration (300ms)
 * - Animation tokens: --igds-button-link-transition-timing (ease-in-out)
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  label = 'Button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  outlined = false,
  ghost = false,
  icon,
  iconLead,
  iconEnd,
  className = '',
  children,
  type = 'button',
  linkColor,
  ...props
}, ref) => {
  // Support legacy Figma export prop name `icon` by mapping it to the lead slot.
  const leadIcon = iconLead ?? icon;

  // Detect icon-only mode: no children and no label, but has an icon
  const isIconOnly = !children && !label && (leadIcon || iconEnd);

  // Warn if icon-only button lacks accessible label
  if (isIconOnly && !props['aria-label'] && !props['aria-labelledby']) {
    console.warn('Icon-only buttons should have aria-label or aria-labelledby for accessibility');
  }

  const resolvedLinkColor =
    variant === 'link' ? (linkColor ?? 'primary') : undefined;

  const classNames = [
    'igds-button',
    `igds-button--${variant}`,
    `igds-button--${size}`,
    // For link variant, add linkColor class for backwards compatibility
    resolvedLinkColor && `igds-button--link-${resolvedLinkColor}`,
    outlined && 'igds-button--outlined',
    ghost && 'igds-button--ghost',
    disabled && 'igds-button--disabled',
    isIconOnly && 'igds-button--icon-only',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {leadIcon && <span className="igds-button__icon-lead">{leadIcon}</span>}
      {!isIconOnly && <span className="igds-button__label">{children || label}</span>}
      {iconEnd && <span className="igds-button__icon-end">{iconEnd}</span>}
    </button>
  );
});

Button.displayName = 'Button';
