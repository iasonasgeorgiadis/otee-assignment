import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import './Tabs.css';

export interface TabsContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  size: 'medium' | 'small';
  orientation: 'horizontal' | 'vertical';
  disabled?: boolean;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within a Tabs component');
  }
  return context;
};

export interface TabsProps {
  /** The default active tab value (uncontrolled mode) */
  defaultValue?: string;
  /** The controlled active tab value */
  value?: string;
  /** Callback when the active tab changes */
  onValueChange?: (value: string) => void;
  /** Size variant of the tabs */
  size?: 'medium' | 'small';
  /** Whether all tabs are disabled */
  disabled?: boolean;
  /** The orientation of the tabs */
  orientation?: 'horizontal' | 'vertical';
  /** Child components (TabList and TabPanel) */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Tabs component - A compound component for creating accessible tabbed interfaces
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1">Tab 1</Tab>
 *     <Tab value="tab2">Tab 2</Tab>
 *   </TabList>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 *   <TabPanel value="tab2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  size = 'medium',
  disabled = false,
  orientation = 'horizontal',
  children,
  className = '',
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleValueChange = useCallback((newValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(newValue);
    }
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  const contextValue = useMemo(() => ({
    value,
    onValueChange: handleValueChange,
    size,
    orientation,
    disabled,
  }), [value, handleValueChange, size, orientation, disabled]);

  const classNames = [
    'igds-tabs',
    `igds-tabs--${orientation}`,
    `igds-tabs--${size}`,
    disabled && 'igds-tabs--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={classNames}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  /** Child Tab components */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Accessible label for the tab list */
  'aria-label'?: string;
}

/**
 * TabList component - Container for Tab components
 */
export const TabList: React.FC<TabListProps> = ({
  children,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const { orientation } = useTabs();

  const classNames = [
    'igds-tabs__list',
    `igds-tabs__list--${orientation}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      aria-label={ariaLabel}
      className={classNames}
    >
      {children}
    </div>
  );
};

export interface TabProps {
  /** Unique value for this tab */
  value: string;
  /** Whether this specific tab is disabled */
  disabled?: boolean;
  /** Tab label content */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Tab component - Individual tab button
 */
export const Tab: React.FC<TabProps> = ({
  value: tabValue,
  disabled: tabDisabled = false,
  children,
  className = '',
}) => {
  const { value: activeValue, onValueChange, size, disabled: tabsDisabled, orientation } = useTabs();
  const isSelected = activeValue === tabValue;
  const isDisabled = tabsDisabled || tabDisabled;
  const tabRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (!isDisabled && !isSelected) {
      onValueChange(tabValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const tabList = tabRef.current?.parentElement;
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]:not([disabled])')) as HTMLElement[];
    const currentIndex = tabs.indexOf(tabRef.current!);

    let newIndex: number | null = null;
    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    switch (e.key) {
      case nextKey:
        e.preventDefault();
        newIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
        break;
      case prevKey:
        e.preventDefault();
        newIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        newIndex = tabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick();
        return;
      default:
        return;
    }

    if (newIndex !== null && tabs[newIndex]) {
      const newTab = tabs[newIndex];
      const newTabValue = newTab.id.replace('tab-', '');
      onValueChange(newTabValue);
      newTab.focus();
    }
  };

  React.useEffect(() => {
    if (isSelected && tabRef.current) {
      // Only focus if the tab was changed via keyboard navigation
      if (document.activeElement?.getAttribute('role') === 'tab') {
        tabRef.current.focus();
      }
    }
  }, [isSelected]);

  const classNames = [
    'igds-tabs__tab',
    `igds-tabs__tab--${size}`,
    isSelected && 'igds-tabs__tab--selected',
    !isSelected && 'igds-tabs__tab--active',
    isDisabled && 'igds-tabs__tab--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={tabRef}
      role="tab"
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      tabIndex={isSelected ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      className={classNames}
      id={`tab-${tabValue}`}
      aria-controls={`panel-${tabValue}`}
    >
      <span className="igds-tabs__tab-label">{children}</span>
    </button>
  );
};

export interface TabPanelProps {
  /** The value that corresponds to the tab */
  value: string;
  /** Panel content */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * TabPanel component - Content panel shown when tab is active
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  value: panelValue,
  children,
  className = '',
}) => {
  const { value: activeValue } = useTabs();
  const isSelected = activeValue === panelValue;

  if (!isSelected) {
    return null;
  }

  const classNames = [
    'igds-tabs__panel',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      role="tabpanel"
      id={`panel-${panelValue}`}
      aria-labelledby={`tab-${panelValue}`}
      tabIndex={0}
      className={classNames}
    >
      {children}
    </div>
  );
};