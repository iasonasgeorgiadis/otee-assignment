import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import './Dropdown.css';
import { MenuItem } from '../MenuItem/MenuItem';

export interface DropdownItem {
  /** Unique identifier for the item */
  id: string;
  /** The text label to display */
  label: string;
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether to show a divider after this item */
  divider?: boolean;
}

export interface DropdownProps {
  /** Array of dropdown items */
  items: DropdownItem[];
  /** The variant of the dropdown */
  variant?: 'text' | 'selected' | 'checkbox-left' | 'checkbox-right';
  /** Whether the dropdown is open (controlled) */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Callback when an item is selected */
  onSelect?: (item: DropdownItem, index: number) => void;
  /** Maximum height of the dropdown */
  maxHeight?: string;
  /** Minimum width of the dropdown */
  minWidth?: string;
  /** Additional CSS class names */
  className?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Placeholder text when no trigger is provided */
  placeholder?: string;
  /** Children to render as the dropdown trigger */
  children?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  variant = 'text',
  open: controlledOpen,
  onOpenChange,
  onSelect,
  maxHeight,
  minWidth,
  className = '',
  disabled = false,
  placeholder = 'Select an option',
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Use controlled or internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = useCallback((newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [controlledOpen, onOpenChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // Keyboard navigation
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    const enabledItems = items.filter(item => !item.disabled);
    const enabledItemsCount = enabledItems.length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => {
            const next = prev < enabledItemsCount - 1 ? prev + 1 : 0;
            return next;
          });
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(enabledItemsCount - 1);
        } else {
          setFocusedIndex(prev => {
            const next = prev > 0 ? prev - 1 : enabledItemsCount - 1;
            return next;
          });
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else if (focusedIndex >= 0 && focusedIndex < enabledItemsCount) {
          const enabledItem = enabledItems[focusedIndex];
          const originalIndex = items.findIndex(item => item.id === enabledItem.id);
          handleItemSelect(enabledItem, originalIndex);
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;

      default:
        break;
    }
  };

  // Handle item selection
  const handleItemSelect = (item: DropdownItem, index: number) => {
    if (item.disabled) return;

    // For selected variant, handle single selection with toggle
    if (variant === 'selected') {
      // Toggle the selection state of the clicked item
      const updatedItem = { ...item, selected: !item.selected };
      onSelect?.(updatedItem, index);
      // Don't close for selected variant - keep it open like checkbox variants
    } else {
      onSelect?.(item, index);
    }

    // For text variant only, close dropdown after selection
    if (variant === 'text') {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  // Handle multi-select variants
  const handleCheckboxChange = (item: DropdownItem, index: number, selected: boolean) => {
    if (item.disabled) return;

    const updatedItem = { ...item, selected };
    onSelect?.(updatedItem, index);
  };

  // Build container class names
  const containerClass = [
    'igds-dropdown',
    `igds-dropdown--${variant}`,
    isOpen ? 'igds-dropdown--open' : '',
    disabled ? 'igds-dropdown--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const getMenuItemVisuals = () => {
    switch (variant) {
      case 'checkbox-left':
      case 'checkbox-right':
        return { size: 'small' as const, withIcon: true };
      case 'selected':
        return { size: 'medium' as const, withIcon: true };
      default:
        return { size: 'medium' as const, withIcon: false };
    }
  };

  const menuItemVisuals = getMenuItemVisuals();

  return (
    <div className={containerClass} ref={dropdownRef}>
      {/* Trigger */}
      {children && (
        <div
          className="igds-dropdown__trigger"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-disabled={disabled}
        >
          {children}
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="igds-dropdown__menu"
          role="menu"
          style={{
            maxHeight: maxHeight || 'var(--igds-dropdown-max-height)',
            minWidth: minWidth || 'var(--igds-dropdown-width)',
          }}
          onKeyDown={handleKeyDown}
        >
          <div className="igds-dropdown__content">
            {items.map((item, index) => {
              const enabledItems = items.filter(i => !i.disabled);
              const enabledIndex = enabledItems.findIndex(i => i.id === item.id);
              const isFocused = enabledIndex === focusedIndex && !item.disabled;

              return (
                <div
                  key={item.id}
                  ref={el => (itemsRef.current[index] = el)}
                  className={`igds-dropdown__item ${isFocused ? 'igds-dropdown__item--focused' : ''}`}
                >
                  <MenuItem
                    label={item.label}
                    size={menuItemVisuals.size}
                    withIcon={menuItemVisuals.withIcon}
                    hover={isFocused}
                    disabled={item.disabled}
                    onClick={() => {
                      if (variant === 'checkbox-left' || variant === 'checkbox-right') {
                        handleCheckboxChange(item, index, !item.selected);
                      } else {
                        handleItemSelect(item, index);
                      }
                    }}
                  />
                  {item.divider && <div className="igds-dropdown__divider" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
