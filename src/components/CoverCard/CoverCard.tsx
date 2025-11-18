import React from 'react';
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';
import './CoverCard.css';

export interface CoverCardProps {
  /** Card title (required) */
  title: string;

  /** Color mode for the card */
  mode?: 'light' | 'dark';

  /** Image URL for the card */
  imageUrl?: string;

  /** Image source for the card */
  imageSrc?: string;

  /** Alternative text for the cover image (defaults to `title`) */
  imageAlt?: string;

  /** Optional click handler for the card */
  onClick?: () => void;

  /** Optional custom class name */
  className?: string;
}

/**
 * CoverCard component displays a product image with a title below it.
 * Supports light and dark modes with hover state interactions.
 *
 * Features:
 * - Two color modes: light (default) and dark
 * - Automatic hover state with subtle text color changes
 * - Uses existing ImagePlaceholder component for consistent image display
 * - Data-driven visibility pattern for optional image content
 * - Accessible with proper semantic HTML structure
 *
 * @example
 * // Basic cover card with title only
 * <CoverCard title="International Studies of Economics" />
 *
 * @example
 * // Cover card with custom image and dark mode
 * <CoverCard
 *   title="International Studies of Economics"
 *   mode="dark"
 *   imageUrl="/path/to/image.jpg"
 *   onClick={() => console.log('Card clicked')}
 * />
 */
export const CoverCard: React.FC<CoverCardProps> = ({
  title,
  mode = 'light',
  imageUrl,
  imageSrc,
  imageAlt,
  onClick,
  className = ''
}) => {
  const classNames = [
    'igds-cover-card',
    `igds-cover-card--${mode}`,
    onClick ? 'igds-cover-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const triggerKeys = ['Enter', ' ', 'Spacebar'];
    if (onClick && triggerKeys.includes(event.key)) {
      event.preventDefault();
      onClick();
    }
  };

  const imageAltText = imageAlt ?? title;

  return (
    <div
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      <div className="igds-cover-card__image">
        {(imageUrl || imageSrc) ? (
          <img
            src={imageUrl || imageSrc}
            alt={imageAltText}
            className="igds-cover-card__image-element"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      <div className="igds-cover-card__title">
        {title}
      </div>
    </div>
  );
};