import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { Button } from '../Button';
import { MenuItem } from '../MenuItem';
import { MaterialIcon } from '../MaterialIcon';
import type { MaterialIconProps } from '../MaterialIcon/MaterialIcon';
import './ProjectBrowser.css';

export type ProjectBrowserState = 'expanded' | 'collapsed';

export interface ProjectBrowserAction {
  /** Unique identifier used by callbacks */
  id: string;
  /** Material icon name rendered in the action slot */
  iconName: string;
  /** Optionally override the Material icon variant */
  iconVariant?: MaterialIconProps['variant'];
  /** Accessible label for the action button */
  ariaLabel: string;
  /** Optional placement to push actions to the trailing edge */
  placement?: 'leading' | 'trailing';
}

export interface ProjectBrowserSection {
  /** Identifier passed through onSectionSelect */
  id: string;
  /** Visible label inside the navigation slot */
  label: string;
}

export interface ProjectBrowserProps {
  /** Heading displayed at the top of the panel */
  projectName?: string;
  /** Toolbar actions rendered below the heading */
  actions?: ProjectBrowserAction[];
  /** Navigation links listed underneath the toolbar */
  sections?: ProjectBrowserSection[];
  /** Controlled expanded state. When provided the component becomes controlled. */
  expanded?: boolean;
  /** Initial expanded state when the component is uncontrolled */
  defaultExpanded?: boolean;
  /** Notifies parent components whenever the panel toggles */
  onToggle?: (nextState: ProjectBrowserState) => void;
  /** Fired when a toolbar action is pressed */
  onActionSelect?: (actionId: string) => void;
  /** Fired when a section row is pressed */
  onSectionSelect?: (sectionId: string) => void;
  className?: string;
}

const DEFAULT_ACTIONS: ProjectBrowserAction[] = [
  { id: 'files', iconName: 'save', ariaLabel: 'Browse files', iconVariant: 'symbols-outlined' },
  { id: 'add', iconName: 'add', ariaLabel: 'Create resource', iconVariant: 'symbols-outlined' },
  { id: 'code', iconName: 'code_blocks', ariaLabel: 'Open code blocks', iconVariant: 'symbols-outlined' },
  { id: 'history', iconName: 'deployed_code_history', ariaLabel: 'Deployment history', iconVariant: 'symbols-outlined' },
  { id: 'packages', iconName: 'deployed_code_history', ariaLabel: 'Project packages', iconVariant: 'symbols-outlined' },
  {
    id: 'more',
    iconName: 'more_vert',
    ariaLabel: 'More project actions',
    iconVariant: 'symbols-outlined',
    placement: 'trailing'
  }
];

const DEFAULT_SECTIONS: ProjectBrowserSection[] = [
  { id: 'data-types', label: 'Data Types' },
  { id: 'functions', label: 'Functions' },
  { id: 'function-blocks', label: 'Function Blocks' },
  { id: 'programs', label: 'Programs' }
];

const DEFAULT_PROJECT_NAME = 'Project Name';

export const ProjectBrowser: FC<ProjectBrowserProps> = ({
  projectName = DEFAULT_PROJECT_NAME,
  actions = DEFAULT_ACTIONS,
  sections = DEFAULT_SECTIONS,
  expanded,
  defaultExpanded = true,
  onToggle,
  onActionSelect,
  onSectionSelect,
  className
}) => {
  const isControlled = typeof expanded === 'boolean';
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpanded = isControlled ? expanded : internalExpanded;

  const resolvedStateLabel: ProjectBrowserState = isExpanded ? 'expanded' : 'collapsed';

  const handleToggle = () => {
    const next = !isExpanded;

    if (!isControlled) {
      setInternalExpanded(next);
    }

    onToggle?.(next ? 'expanded' : 'collapsed');
  };

  const handleActionSelect = (actionId: string) => {
    onActionSelect?.(actionId);
  };

  const handleSectionSelect = (sectionId: string) => {
    onSectionSelect?.(sectionId);
  };

  const rootClassName = useMemo(() => {
    return [
      'project-browser',
      `project-browser--${resolvedStateLabel}`,
      className
    ]
      .filter(Boolean)
      .join(' ');
  }, [className, resolvedStateLabel]);

  const leadingActions = useMemo(
    () => actions.filter((action) => action.placement !== 'trailing'),
    [actions]
  );

  const trailingActions = useMemo(
    () => actions.filter((action) => action.placement === 'trailing'),
    [actions]
  );

  const renderActionButton = (action: ProjectBrowserAction) => (
    <Button
      key={action.id}
      variant="neutral"
      ghost={true}
      size="medium"
      label=""
      aria-label={action.ariaLabel}
      className="project-browser__icon-button"
      iconLead={<MaterialIcon name={action.iconName} variant={action.iconVariant} size={24} />}
      onClick={() => handleActionSelect(action.id)}
    />
  );

  return (
    <section className={rootClassName} data-state={resolvedStateLabel} aria-label="Project browser">
      <div className="project-browser__header">
        <h2 className="project-browser__title">{projectName}</h2>
        <Button
          type="button"
          variant="neutral"
          size="medium"
          label=""
          className="project-browser__icon-button project-browser__toggle"
          onClick={handleToggle}
          aria-label={isExpanded ? 'Collapse project browser' : 'Expand project browser'}
          aria-expanded={isExpanded}
          iconLead={<MaterialIcon name="thumbnail_bar" variant="symbols-outlined" size={24} />}
        />
      </div>

      <div className="project-browser__body" aria-hidden={!isExpanded}>
        <div className="project-browser__actions">
          {leadingActions.length > 0 && (
            <div className="project-browser__actions-group project-browser__actions-group--leading">
              {leadingActions.map(renderActionButton)}
            </div>
          )}
          {trailingActions.length > 0 && (
            <div className="project-browser__actions-group project-browser__actions-group--trailing">
              {trailingActions.map(renderActionButton)}
            </div>
          )}
        </div>
        <ul className="project-browser__sections" role="menu">
          {sections.map((section) => (
            <li key={section.id} className="project-browser__section-item">
              <MenuItem
                label={section.label}
                size="medium"
                withIcon
                iconName="arrow_right"
                iconVariant="symbols-outlined"
                className="project-browser__menu-item"
                onClick={() => handleSectionSelect(section.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
