import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import type { MaterialIconProps } from '../MaterialIcon/MaterialIcon';
import { Tooltip } from '../Tooltip';
import './RightRail.css';

export interface RightRailAction {
  /** Unique identifier used by callbacks */
  id: string;
  /** Material icon name rendered in the action button */
  iconName: string;
  /** Optionally override the Material icon variant */
  iconVariant?: MaterialIconProps['variant'];
  /** Accessible label for the action button */
  ariaLabel: string;
}

export interface RightRailProps {
  /** Controlled selected state. When provided the component becomes controlled. */
  selected?: boolean;
  /** Initial selected state when the component is uncontrolled */
  defaultSelected?: boolean;
  /** Notifies parent components whenever the selection state toggles */
  onToggle?: (isSelected: boolean) => void;
  /** Fired when a toolbar action is pressed */
  onActionSelect?: (actionId: string) => void;
  /** Toolbar actions rendered in the rail */
  actions?: RightRailAction[];
  /** Additional CSS class names */
  className?: string;
}

const DEFAULT_ACTIONS: RightRailAction[] = [
  { id: 'dashboard', iconName: 'web', ariaLabel: 'Dashboard', iconVariant: 'symbols-outlined' },
  { id: 'help', iconName: 'help', ariaLabel: 'Help', iconVariant: 'symbols-outlined' },
  { id: 'search', iconName: 'search', ariaLabel: 'Search', iconVariant: 'symbols-outlined' }
];

export const RightRail: FC<RightRailProps> = ({
  selected,
  defaultSelected = false,
  onToggle,
  onActionSelect,
  actions = DEFAULT_ACTIONS,
  className
}) => {
  const isControlled = typeof selected === 'boolean';
  const [internalSelected, setInternalSelected] = useState(defaultSelected);

  const isSelected = isControlled ? selected : internalSelected;

  const handleToggle = () => {
    const next = !isSelected;

    if (!isControlled) {
      setInternalSelected(next);
    }

    onToggle?.(next);
  };

  const handleActionSelect = (actionId: string) => {
    onActionSelect?.(actionId);
  };

  const stateLabel = isSelected ? 'selected' : 'active';

  const rootClassName = useMemo(() => {
    return [
      'right-rail',
      `right-rail--${stateLabel}`,
      className
    ]
      .filter(Boolean)
      .join(' ');
  }, [className, stateLabel]);

  return (
    <aside className={rootClassName} data-state={stateLabel} aria-label="Right rail toolbar">
      <div className="right-rail__actions">
        {actions.map((action) => (
          <Tooltip
            key={action.id}
            title={null}
            body={action.ariaLabel}
            placement="left"
          >
            <Button
              variant="neutral"
              size="medium"
              label=""
              aria-label={action.ariaLabel}
              className="right-rail__action-button"
              iconLead={<MaterialIcon name={action.iconName} variant={action.iconVariant} size={24} />}
              onClick={() => handleActionSelect(action.id)}
            />
          </Tooltip>
        ))}
      </div>

      <div className="right-rail__separator" />

      <Tooltip
        title={null}
        body={isSelected ? 'Exit selection mode' : 'Enter selection mode'}
        placement="left"
      >
        <Button
          variant="primary"
          size="medium"
          label=""
          className="right-rail__primary-button"
          aria-label={isSelected ? 'Exit selection mode' : 'Enter selection mode'}
          aria-pressed={isSelected}
          onClick={handleToggle}
          iconLead={
            <span className="right-rail__icon-wrapper">
              <MaterialIcon
                name="auto_awesome"
                variant="symbols-outlined"
                size={24}
                className={`right-rail__icon right-rail__icon--sparkle ${!isSelected ? 'right-rail__icon--visible' : ''}`}
              />
              <MaterialIcon
                name="output"
                variant="symbols-outlined"
                size={24}
                className={`right-rail__icon right-rail__icon--arrow ${isSelected ? 'right-rail__icon--visible' : ''}`}
              />
            </span>
          }
        />
      </Tooltip>
    </aside>
  );
};
