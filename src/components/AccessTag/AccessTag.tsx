import React from 'react';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './AccessTag.css';

export interface AccessTagProps {
  /** The access type to display */
  type: 'open' | 'free' | 'full';
  /** Optional custom class name */
  className?: string;
}

// Configuration for each access type
const accessConfig = {
  open: {
    label: 'Open Access',
    className: 'igds-access-tag--open'
  },
  free: {
    label: 'Free Access',
    className: 'igds-access-tag--free'
  },
  full: {
    label: 'Free to Read',
    className: 'igds-access-tag--full'
  }
};

/**
 * AccessTag component for displaying access model information
 *
 * Features three variants:
 * - Open Access (pink)
 * - Free Access (orange)
 * - Free to Read (green - type='full')
 *
 * Uses Material Icons lock_open for all variants
 */
export const AccessTag: React.FC<AccessTagProps> = ({
  type,
  className = ''
}) => {
  const config = accessConfig[type];

  const classNames = [
    'igds-access-tag',
    config.className,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="igds-access-tag__icon" aria-hidden="true">
        <MaterialIcon name="lock_open" />
      </div>
      <span className="igds-access-tag__label">
        {config.label}
      </span>
    </div>
  );
};
