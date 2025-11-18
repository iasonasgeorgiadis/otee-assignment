import React from 'react';
import './Logo.css';

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Brand variant to display - required */
  brand: 'wol' | 'wiley';
  /** Logo form - full includes text, compact is symbol only */
  form: 'full' | 'compact';
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
 * Logo component for displaying brand assets
 *
 * Supports both WOL (Wiley Online Library) and Wiley corporate brands
 * with automatic color mode detection and responsive sizing.
 */
export const Logo: React.FC<LogoProps> = ({
  brand,
  form,
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
      return isDark ? 'dark' : 'light';
    }
    return 'light';
  };

  const resolvedColorMode = getColorMode();

  // Determine file extension based on available assets for each brand
  const fileExtension = brand === 'wol' ? 'png' : 'svg';

  // Build logo filename
  const getLogoPath = () => {
    const parts = [brand, 'logo', form, resolvedColorMode];
    return `/brand/logos/web/${parts.join('-')}.${fileExtension}`;
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
    `logo--${brand}`,
    `logo--${form}`,
    `logo--${typeof size === 'string' ? size : 'custom'}`,
    `logo--${resolvedColorMode}`,
    className
  ].filter(Boolean).join(' ');

  // Generate alt text if not provided
  const getAltText = () => {
    if (alt !== undefined) return alt;

    const brandName = brand === 'wol' ? 'Wiley Online Library' : 'Wiley';
    const formText = form === 'compact' ? 'logo' : `${form} logo`;

    return `${brandName} ${formText}`;
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
