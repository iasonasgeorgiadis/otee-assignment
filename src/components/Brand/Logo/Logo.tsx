import React from 'react';
import './Logo.css';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Size aligned with Figma naming convention */
  size?: 'small' | 'large' | 'xlarge' | number;
  /** Color mode for the logo */
  colorMode?: 'light' | 'dark' | 'auto';
  /** Custom class name */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
}

/**
 * Logo component for displaying OTee brand assets with automatic
 * color mode detection and responsive sizing.
 */
export const Logo: React.FC<LogoProps> = ({
  size = 'large',
  colorMode = 'auto',
  className = '',
  alt,
  style,
  ...props
}) => {
  // Auto-detect color mode based on CSS custom property
  const getColorMode = () => {
    if (colorMode !== 'auto') return colorMode;

    // Default to light if auto-detection fails
    if (typeof window !== 'undefined') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'light' : 'dark';
    }
    return 'light';
  };

  const resolvedColorMode = getColorMode();

  const getLogoPath = () => {
    const prefersDark = resolvedColorMode === 'light';
    return prefersDark
      ? '/brand/logos/web/otee-logo-dark.svg'
      : '/brand/logos/web/otee-logo-light.svg';
  };

  // Handle size styling
  const getSizeStyle = () => {
    if (typeof size === 'number') {
      return { height: `${size}px` };
    }

    return {}; // CSS classes handle predefined sizes
  };

  // Generate CSS classes
  const classes = [
    'logo',
    `logo--${typeof size === 'string' ? size : 'custom'}`,
    `logo--${resolvedColorMode}`,
    className
  ].filter(Boolean).join(' ');

  // Generate alt text if not provided
  const getAltText = () => {
    if (alt !== undefined) return alt;

    return 'OTee logo';
  };

  return (
    <img
      {...props}
      src={getLogoPath()}
      alt={getAltText()}
      className={classes}
      style={{ ...getSizeStyle(), ...style }}
    />
  );
};
