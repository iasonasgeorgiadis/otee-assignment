import React from 'react';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './IconScale.css';

export type IconSize = 16 | 24 | 32 | 64 | 128;

export interface IconScaleProps {
  /** The icon name to display at different sizes */
  iconName?: string;
  /** Whether to show size labels */
  showLabels?: boolean;
  /** Custom class name */
  className?: string;
  /** The specific size to render (if you want just one size) */
  size?: IconSize;
  /** Custom icon component to use instead of MaterialIcon */
  iconComponent?: React.ReactNode;
}

/**
 * IconScale component displays icons at standardized sizes for the design system.
 * It can show all sizes for documentation or a single size for usage.
 *
 * @example
 * // Show all icon sizes
 * <IconScale iconName="account_circle" showLabels />
 *
 * @example
 * // Show single size
 * <IconScale iconName="account_circle" size={32} />
 */
export const IconScale: React.FC<IconScaleProps> = ({
  iconName = 'account_circle',
  showLabels = false,
  className = '',
  size,
  iconComponent
}) => {
  const sizes: IconSize[] = [16, 24, 32, 64, 128];

  // If a specific size is requested, render just that size
  if (size) {
    return (
      <div className={`igds-icon-scale igds-icon-scale--single ${className}`}>
        <div className="igds-icon-scale__item">
          {iconComponent || (
            <MaterialIcon
              name={iconName}
              size={size}
              className="igds-icon-scale__icon"
            />
          )}
          {showLabels && (
            <span className="igds-icon-scale__label">{size}px</span>
          )}
        </div>
      </div>
    );
  }

  // Otherwise, show all sizes
  return (
    <div className={`igds-icon-scale ${className}`}>
      {sizes.map((iconSize) => (
        <div key={iconSize} className="igds-icon-scale__item">
          {iconComponent || (
            <MaterialIcon
              name={iconName}
              size={iconSize}
              className="igds-icon-scale__icon"
            />
          )}
          {showLabels && (
            <span className="igds-icon-scale__label">{iconSize}px</span>
          )}
        </div>
      ))}
    </div>
  );
};