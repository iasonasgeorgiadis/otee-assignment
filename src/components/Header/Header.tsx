import type { FC } from 'react';
import { Logo } from '../Brand/Logo/Logo';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './Header.css';

export interface HeaderProps {
  className?: string;
  onClipboardClick?: () => void;
  onGridClick?: () => void;
  onThemeClick?: () => void;
  onMenuClick?: () => void;
  onSharedResourcesClick?: () => void;
  onProfileClick?: () => void;
}

const ICON_SIZE = 24;

export const Header: FC<HeaderProps> = ({
  className = '',
  onClipboardClick,
  onGridClick,
  onThemeClick,
  onMenuClick,
  onSharedResourcesClick,
  onProfileClick
}) => {
  const headerClassName = ['otee-header', className].filter(Boolean).join(' ');

  return (
    <header className={headerClassName}>
      <div className="otee-header__inner">
        <div className="otee-header__start">
          <div
            className="otee-header__primary-actions"
            role="group"
            aria-label="Primary header actions"
          >
            <button
              type="button"
              className="otee-header__action-button"
              aria-label="Review submissions"
              onClick={onClipboardClick}
            >
              <MaterialIcon name="assignment_turned_in" variant="outlined" size={ICON_SIZE} />
            </button>
            <button
              type="button"
              className="otee-header__action-button"
              aria-label="Open workspace grid"
              onClick={onGridClick}
            >
              <MaterialIcon name="apps" variant="outlined" size={ICON_SIZE} />
            </button>
            <button
              type="button"
              className="otee-header__action-button"
              aria-label="Toggle theme"
              onClick={onThemeClick}
            >
              <MaterialIcon name="light_mode" variant="outlined" size={ICON_SIZE} />
            </button>
          </div>

          <button
            type="button"
            className="otee-header__action-button otee-header__action-button--menu"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <MaterialIcon name="menu" variant="outlined" size={ICON_SIZE} />
          </button>
        </div>

        <div className="otee-header__logo">
          <Logo size="large" colorMode="light" />
        </div>

        <div className="otee-header__end">
          <button
            type="button"
            className="otee-header__shared-button"
            onClick={onSharedResourcesClick}
          >
            <MaterialIcon name="language" variant="outlined" size={20} />
            <span className="otee-header__shared-label">Shared resources</span>
          </button>
          <button
            type="button"
            className="otee-header__action-button"
            aria-label="Open profile"
            onClick={onProfileClick}
          >
            <MaterialIcon name="account_circle" variant="outlined" size={ICON_SIZE} />
          </button>
        </div>
      </div>
    </header>
  );
};
