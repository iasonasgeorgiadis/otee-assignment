import type { FC } from 'react';
import { Button } from '../Button';
import { Logo } from '../Brand/Logo/Logo';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import { Tooltip } from '../Tooltip';
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
            <Tooltip title={null} body="Review submissions" placement="bottom">
              <Button
                aria-label="Review submissions"
                variant="neutral"
                label=""
                className="otee-header__icon-button"
                iconLead={<MaterialIcon name="inventory" variant="outlined" size={ICON_SIZE} />}
                onClick={onClipboardClick}
              />
            </Tooltip>
            <Tooltip title={null} body="Open workspace grid" placement="bottom">
              <Button
                aria-label="Open workspace grid"
                variant="neutral"
                label=""
                className="otee-header__icon-button"
                iconLead={<MaterialIcon name="developer_board" variant="outlined" size={ICON_SIZE} />}
                onClick={onGridClick}
              />
            </Tooltip>
            <Tooltip title={null} body="Toggle theme" placement="bottom">
              <Button
                aria-label="Toggle theme"
                variant="neutral"
                label=""
                className="otee-header__icon-button"
                iconLead={<MaterialIcon name="light_mode" variant="outlined" size={ICON_SIZE} />}
                onClick={onThemeClick}
              />
            </Tooltip>
          </div>

          <Tooltip title={null} body="Open menu" placement="bottom">
            <Button
              aria-label="Open menu"
              variant="neutral"
              label=""
              className="otee-header__icon-button otee-header__icon-button--menu"
              iconLead={<MaterialIcon name="menu" variant="outlined" size={ICON_SIZE} />}
              onClick={onMenuClick}
            />
          </Tooltip>
        </div>

        <div className="otee-header__logo">
          <Logo size="large" colorMode="light" />
        </div>

        <div className="otee-header__end">
          <Tooltip title={null} body="Shared resources" placement="bottom">
            <Button
              variant="neutral"
              className="otee-header__shared-button"
              iconLead={<MaterialIcon name="language" variant="outlined" size={20} />}
              onClick={onSharedResourcesClick}
            >
              Shared resources
            </Button>
          </Tooltip>
          <Tooltip title={null} body="Open profile" placement="bottom">
            <Button
              aria-label="Open profile"
              variant="neutral"
              label=""
              className="otee-header__icon-button"
              iconLead={<MaterialIcon name="account_circle" variant="outlined" size={ICON_SIZE} />}
              onClick={onProfileClick}
            />
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
