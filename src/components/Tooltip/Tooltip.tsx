import React, { useId, useState } from 'react';
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
  /** Trigger element that receives the tooltip on hover/focus */
  children?: React.ReactNode;
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
  children,
  id,
  ...props
}) => {
  const resolvedPlacement = normalizePlacement(placement);
  const shouldRenderBody = hasBody && body !== undefined && body !== null;
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const tooltipId = id ?? generatedId;
  const shouldWrapTrigger = Boolean(children);

  const classNames = [
    'igds-tooltip',
    `igds-tooltip--placement-${resolvedPlacement}`,
    shouldWrapTrigger && isVisible && 'igds-tooltip--visible',
    className
  ].filter(Boolean).join(' ');

  const tooltipContent = (
    <div
      className={classNames}
      role="tooltip"
      id={tooltipId}
      aria-hidden={shouldWrapTrigger ? !isVisible : undefined}
      {...props}
    >
      <div className="igds-tooltip__arrow" aria-hidden="true" />
      {title !== undefined && title !== null && (
        <p className="igds-tooltip__title">{title}</p>
      )}
      {shouldRenderBody && (
        <p className="igds-tooltip__body">{body}</p>
      )}
    </div>
  );

  if (!shouldWrapTrigger) {
    return tooltipContent;
  }

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  const appendDescribedBy = (current?: string): string | undefined => {
    if (current && current.trim().length > 0) {
      return `${current.trim()} ${tooltipId}`.trim();
    }

    return tooltipId;
  };

  const triggerChild = React.isValidElement(children)
    ? React.cloneElement(children, {
        'aria-describedby': appendDescribedBy(children.props['aria-describedby'])
      })
    : (
      <span aria-describedby={tooltipId}>
        {children}
      </span>
    );

  return (
    <span
      className="igds-tooltip__trigger"
      data-placement={resolvedPlacement}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {triggerChild}
      {tooltipContent}
    </span>
  );
};
