import React, { useId, useState } from 'react';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './Accordion.css';

export interface AccordionProps {
  /** The title text for the accordion header */
  title?: string;
  /** The description text content that shows when expanded */
  descriptionText?: string;
  /** The visual size variant of the accordion */
  size?: 'small' | 'medium' | 'large';
  /** Whether the accordion is expanded (controlled) */
  expanded?: boolean;
  /** Callback when accordion is toggled */
  onToggle?: (expanded: boolean) => void;
  /** Whether the accordion is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Children content (overrides descriptionText if provided) */
  children?: React.ReactNode;
}

/**
 * Accordion component that matches the Figma design system
 *
 * Features:
 * - Three size variants: small (16px), medium (20px), large (24px)
 * - Smooth expand/collapse animation
 * - Keyboard accessibility (Enter/Space to toggle)
 * - Controlled or uncontrolled mode
 * - Hover states with color transitions
 */
export const Accordion: React.FC<AccordionProps> = ({
  title = 'Title',
  descriptionText = 'Description',
  size = 'small',
  expanded,
  onToggle,
  disabled = false,
  className = '',
  children,
}) => {
  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState(false);
  const headerId = useId();
  const contentId = `${headerId}-content`;

  // Use controlled if expanded prop is provided, otherwise use internal state
  const isExpanded = expanded !== undefined ? expanded : internalExpanded;

  const handleToggle = () => {
    if (disabled) return;

    const newExpanded = !isExpanded;

    // Update internal state if uncontrolled
    if (expanded === undefined) {
      setInternalExpanded(newExpanded);
    }

    // Call onToggle callback if provided
    onToggle?.(newExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    // Toggle on Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const classNames = [
    'igds-accordion',
    `igds-accordion--${size}`,
    isExpanded && 'igds-accordion--expanded',
    disabled && 'igds-accordion--disabled',
    className
  ].filter(Boolean).join(' ');

  const iconName = isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

  return (
    <div className={classNames}>
      <button
        className="igds-accordion__header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        id={headerId}
        type="button"
      >
        <span className="igds-accordion__title">{title}</span>
        <MaterialIcon
          name={iconName}
          size={24}
          className="igds-accordion__icon"
          aria-hidden="true"
        />
      </button>

      {isExpanded && (
        <div
          className="igds-accordion__content"
          id={contentId}
          role="region"
          aria-labelledby={headerId}
        >
          <div className="igds-accordion__description">
            {children || descriptionText}
          </div>
        </div>
      )}
    </div>
  );
};
