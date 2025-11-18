import React from 'react';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
type CapitalizedPlacement = Capitalize<TooltipPlacement>;
type TooltipPlacementProp = TooltipPlacement | CapitalizedPlacement;

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Heading text or node displayed at the top */
  title?: React.ReactNode;
  /** Supporting text below the title */
  body?: React.ReactNode;
  /** Controls whether the body content is rendered */
  hasBody?: boolean;
  /** Placement of the tooltip arrow relative to the content */
  placement?: TooltipPlacementProp;
}

const VALID_PLACEMENTS: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

const normalizePlacement = (value: TooltipPlacementProp | undefined): TooltipPlacement => {
  if (!value) {
    return 'top';
  }

  const normalized = value.toLowerCase() as TooltipPlacement;
  return VALID_PLACEMENTS.includes(normalized) ? normalized : 'top';
};

/**
 * Tooltip component that mirrors the IGDS Figma specification including
 * typography, spacing, and the diamond-shaped beak used across all placements.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title = 'Title',
  body = 'Body text',
  hasBody = true,
  placement = 'top',
  className = '',
  ...props
}) => {
  const resolvedPlacement = normalizePlacement(placement);
  const shouldRenderBody = hasBody && body !== undefined && body !== null;

  const classNames = [
    'igds-tooltip',
    `igds-tooltip--placement-${resolvedPlacement}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="tooltip" {...props}>
      <div className="igds-tooltip__arrow" aria-hidden="true" />
      {title !== undefined && title !== null && (
        <p className="igds-tooltip__title">{title}</p>
      )}
      {shouldRenderBody && (
        <p className="igds-tooltip__body">{body}</p>
      )}
    </div>
  );
};
