import React from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import './MenuItem.css';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';

export interface MenuItemProps {
  /** Displayed label */
  label?: string;
  /** Visual size of the item */
  size?: 'medium' | 'small';
  /** Whether to render the leading icon */
  withIcon?: boolean;
  /** Force the hover treatment (helpful for docs) */
  hover?: boolean;
  /** Prevent interaction */
  disabled?: boolean;
  /** Optional custom class */
  className?: string;
  /** Override the icon glyph */
  iconName?: string;
  /** Override the Material icon set */
  iconVariant?: React.ComponentProps<typeof MaterialIcon>['variant'];
  /** Callback when the item is activated */
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  label = 'Label',
  size = 'medium',
  withIcon = true,
  hover = false,
  disabled = false,
  className = '',
  iconName = 'play_arrow',
  iconVariant = 'outlined',
  onClick,
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick?.();
    }
  };

  const containerClass = [
    'igds-menu-item',
    `igds-menu-item--${size}`,
    withIcon ? 'igds-menu-item--with-icon' : 'igds-menu-item--text-only',
    hover && !disabled ? 'igds-menu-item--hover' : '',
    disabled ? 'igds-menu-item--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconSize = size === 'medium' ? 24 : 20;

  return (
    <div
      className={containerClass}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {withIcon && (
        <span className={`igds-menu-item__icon igds-menu-item__icon--${size}`}>
          <MaterialIcon
            name={iconName}
            size={iconSize}
            variant={iconVariant}
            className="igds-menu-item__icon-glyph"
          />
        </span>
      )}
      <span className="igds-menu-item__label">{label}</span>
    </div>
  );
};
