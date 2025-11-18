import React from 'react';
import './MaterialIcon.css';

export interface MaterialIconProps {
  name: string;
  size?: number;
  variant?: 'filled' | 'outlined' | 'symbols-outlined';
  className?: string;
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 16,
  variant = 'filled',
  className = ''
}) => {
  let iconClass = 'material-icons';

  if (variant === 'outlined') {
    iconClass = 'material-icons-outlined';
  } else if (variant === 'symbols-outlined') {
    iconClass = 'material-symbols-outlined';
  }

  return (
    <span
      className={`${iconClass} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      {name}
    </span>
  );
}; 