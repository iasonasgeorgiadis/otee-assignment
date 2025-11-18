import React, { useRef, useEffect, useState } from 'react';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './ImagePlaceholder.css';

export interface ImagePlaceholderProps {
  /** Aspect ratio for the placeholder container */
  aspectRatio?: '1:1' | '4:5' | '16:9' | '21:9' | '6:4';
  /** Custom placeholder content (defaults to image icon) */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * ImagePlaceholder component provides consistent placeholder display with multiple aspect ratios.
 * Matches the Figma design system with 5 predefined aspect ratios.
 *
 * @example
 * // Basic placeholder with default icon
 * <ImagePlaceholder aspectRatio="16:9" />
 *
 * @example
 * // Custom placeholder content
 * <ImagePlaceholder aspectRatio="1:1">
 *   <MaterialIcon name="photo" size={32} />
 * </ImagePlaceholder>
 */
export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  aspectRatio = '1:1',
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iconSize, setIconSize] = useState(48);

  useEffect(() => {
    const updateIconSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        // Set icon size to 70% of container height
        const newSize = Math.round(containerHeight * 0.7);
        // Ensure minimum size of 24px and maximum of 120px
        setIconSize(Math.min(120, Math.max(24, newSize)));
      }
    };

    updateIconSize();

    // Update size on window resize
    window.addEventListener('resize', updateIconSize);

    // Use ResizeObserver if available for better performance
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(updateIconSize);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updateIconSize);
      };
    }

    return () => {
      window.removeEventListener('resize', updateIconSize);
    };
  }, []);

  const classNames = [
    'igds-image-placeholder',
    `igds-image-placeholder--${aspectRatio}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} ref={containerRef}>
      {children || (
        <MaterialIcon
          name="image"
          size={iconSize}
          className="igds-image-placeholder__icon"
        />
      )}
    </div>
  );
};