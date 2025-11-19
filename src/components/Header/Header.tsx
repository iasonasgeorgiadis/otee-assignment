import type { FC } from 'react';
import { Button } from '../Button';
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
            <Button
              aria-label="Review submissions"
              variant="neutral"
              label=""
              className="otee-header__icon-button"
              iconLead={<MaterialIcon name="assignment_turned_in" variant="outlined" size={ICON_SIZE} />}
              onClick={onClipboardClick}
            />
            <Button
              aria-label="Open workspace grid"
              variant="neutral"
              label=""
              className="otee-header__icon-button"
              iconLead={<MaterialIcon name="apps" variant="outlined" size={ICON_SIZE} />}
              onClick={onGridClick}
            />
            <Button
              aria-label="Toggle theme"
              variant="neutral"
              label=""
              className="otee-header__icon-button"
              iconLead={<MaterialIcon name="light_mode" variant="outlined" size={ICON_SIZE} />}
              onClick={onThemeClick}
            />
          </div>

          <Button
            aria-label="Open menu"
            variant="neutral"
            label=""
            className="otee-header__icon-button otee-header__icon-button--menu"
            iconLead={<MaterialIcon name="menu" variant="outlined" size={ICON_SIZE} />}
            onClick={onMenuClick}
          />
        </div>

        <div className="otee-header__logo">
          <Logo size="large" colorMode="light" />
        </div>

        <div className="otee-header__end">
          <Button
            variant="neutral"
            className="otee-header__shared-button"
            iconLead={<MaterialIcon name="language" variant="outlined" size={20} />}
            onClick={onSharedResourcesClick}
          >
            Shared resources
          </Button>
          <Button
            aria-label="Open profile"
            variant="neutral"
            label=""
            className="otee-header__icon-button"
            iconLead={<MaterialIcon name="account_circle" variant="outlined" size={ICON_SIZE} />}
            onClick={onProfileClick}
          />
        </div>
      </div>
    </header>
  );
};
