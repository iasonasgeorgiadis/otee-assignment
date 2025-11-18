import React from 'react';
import { Logo } from '../Brand/Logo/Logo';
import { InputField } from '../InputField/InputField';
import { ImagePlaceholder } from '../ImagePlaceholder/ImagePlaceholder';
import { MaterialIcon } from '../MaterialIcon/MaterialIcon';
import './Header.css';

/**
 * Header component props interface
 *
 * Defines the configuration options for the Header component,
 * supporting responsive layouts and data-driven visibility patterns.
 */
export interface HeaderProps {
  /** Institution name to display next to logo - shows institution section when provided */
  institutionName?: string;
  /** Institution logo image URL - used with ImagePlaceholder for institution branding */
  institutionLogo?: string;
  /** Search input placeholder text - shows search section when provided. Defaults to 'Search' if empty string passed */
  searchPlaceholder?: string;
  /** Whether to show cart icon in actions section */
  showCart?: boolean;
  /** Custom login/register text displayed on login button */
  loginText?: string;
  /** Search input change handler - called when user types in search field */
  onSearch?: (value: string) => void;
  /** Cart icon click handler - called when cart button is clicked */
  onCartClick?: () => void;
  /** Login/register click handler - called when login button is clicked */
  onLoginClick?: () => void;
  /** Viewport variant for responsive behavior - determines layout structure */
  viewport?: 'desktop' | 'tablet' | 'mobile';
  /** Custom CSS class name for additional styling */
  className?: string;
}

/**
 * Header component implementing the Figma design system with responsive behavior
 *
 * A comprehensive header component that adapts to different viewport sizes while
 * maintaining consistent branding and functionality. Implements the Data-Driven
 * Visibility Pattern where sections show/hide based on data presence.
 *
 * ## Responsive Variants
 * - **Desktop**: Full layout with centered search, institution info, and all actions
 * - **Tablet**: Compact layout with logo and search on left, actions on right
 * - **Mobile**: Minimal layout with logo left, essential actions right
 *
 * ## Component Composition
 * - Reuses Logo, InputField, IconScale, ImagePlaceholder, and MaterialIcon components
 * - All styling uses design tokens for consistency and theming support
 * - Follows component composition best practices with proper prop exposure
 *
 * ## Data-Driven Visibility
 * - Institution section shows when `institutionName` is provided
 * - Search section shows when `searchPlaceholder` is provided
 * - Cart icon controlled by `showCart` boolean
 * - All handlers are optional and component gracefully handles missing callbacks
 *
 * @example
 * ```tsx
 * // Full desktop header with all features
 * <Header
 *   viewport="desktop"
 *   institutionName="University Library"
 *   searchPlaceholder="Search articles..."
 *   showCart={true}
 *   loginText="Sign In"
 *   onSearch={(query) => handleSearch(query)}
 *   onCartClick={() => openCart()}
 *   onLoginClick={() => showLogin()}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Minimal mobile header
 * <Header
 *   viewport="mobile"
 *   showCart={false}
 *   onLoginClick={() => showLogin()}
 * />
 * ```
 */
const INSTITUTION_LOGO_PLACEHOLDER_MIN_WIDTH = 120;
const INSTITUTION_LOGO_PLACEHOLDER_DEFAULT_WIDTH = 180;
const INSTITUTION_LOGO_PLACEHOLDER_MAX_WIDTH = 300;
const INSTITUTION_LOGO_PLACEHOLDER_CHARACTER_SCALE = 8;

export const Header: React.FC<HeaderProps> = ({
  institutionName,
  institutionLogo,
  searchPlaceholder,
  showCart = true,
  loginText = 'Login / Register',
  onSearch,
  onCartClick,
  onLoginClick,
  viewport = 'desktop',
  className = ''
}) => {
  // Build CSS classes
  const trimmedInstitutionName = institutionName?.trim();

  const headerClasses = [
    'igds-header',
    `igds-header--${viewport}`,
    className
  ].filter(Boolean).join(' ');

  const showInstitutionSection = Boolean(trimmedInstitutionName || institutionLogo);
  const usePlaceholderLogo = !institutionLogo;

  const estimatedPlaceholderWidth = usePlaceholderLogo
    ? Math.max(
        INSTITUTION_LOGO_PLACEHOLDER_MIN_WIDTH,
        Math.min(
          INSTITUTION_LOGO_PLACEHOLDER_MAX_WIDTH,
          trimmedInstitutionName && trimmedInstitutionName.length > 0
            ? trimmedInstitutionName.length * INSTITUTION_LOGO_PLACEHOLDER_CHARACTER_SCALE
            : INSTITUTION_LOGO_PLACEHOLDER_DEFAULT_WIDTH
        )
      )
    : undefined;

  const institutionLogoClassName = [
    'igds-header__institution-logo',
    usePlaceholderLogo && 'igds-header__institution-logo--placeholder'
  ].filter(Boolean).join(' ');

  const institutionLogoStyle = usePlaceholderLogo && estimatedPlaceholderWidth
    ? ({
        '--igds-header-institution-placeholder-width': `${estimatedPlaceholderWidth}px`
      } as React.CSSProperties)
    : undefined;

  // Tablet variant (viewport2 in Figma)
  if (viewport === 'tablet') {
    return (
      <div className={headerClasses}>
        <div className="igds-header__container">
          <Logo
            brand="wol"
            colorMode="light"
            size="large"
            form="full"
            className="igds-header__logo"
          />

          <div className="igds-header__actions">
            <button
              className="igds-header__action-button"
              onClick={() => onSearch?.('')}
              aria-label="Search"
              type="button"
            >
              <MaterialIcon name="search" size={24} />
            </button>
            {showCart && (
              <button
                className="igds-header__action-button"
                onClick={onCartClick}
                aria-label="Shopping cart"
                type="button"
              >
                <MaterialIcon name="shopping_cart" size={24} />
              </button>
            )}
            <button
              className="igds-header__action-button"
              onClick={onLoginClick}
              aria-label="User account"
              type="button"
            >
              <MaterialIcon name="account_circle" size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Mobile variant
  if (viewport === 'mobile') {
    return (
      <div className={headerClasses}>
        <div className="igds-header__container">
          <Logo
            brand="wol"
            colorMode="light"
            size={56}
            form="compact"
            className="igds-header__logo"
          />

          <div className="igds-header__actions">
            <button
              className="igds-header__action-button"
              onClick={() => onSearch?.('')}
              aria-label="Search"
              type="button"
            >
              <MaterialIcon name="search" size={24} />
            </button>
            {showCart && (
              <button
                className="igds-header__action-button"
                onClick={onCartClick}
                aria-label="Shopping cart"
                type="button"
              >
                <MaterialIcon name="shopping_cart" size={24} />
              </button>
            )}
            <button
              className="igds-header__action-button"
              onClick={onLoginClick}
              aria-label="User account"
              type="button"
            >
              <MaterialIcon name="account_circle" size={24} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant (default)
  return (
    <div className={headerClasses}>
      <div className="igds-header__container">
        {/* Left side: Logo and Institution */}
        <div className="igds-header__left">
          <Logo
            brand="wol"
            colorMode="light"
            size="large"
            form="full"
            className="igds-header__logo"
          />

          {/* Institution section - shows when institution data is provided */}
          {showInstitutionSection && (
            <>
              <div className="igds-header__divider" />
              <div className="igds-header__institution">
                <div
                  className={institutionLogoClassName}
                  style={institutionLogoStyle}
                >
                  {institutionLogo ? (
                    <img
                      src={institutionLogo}
                      alt={institutionName ? `${institutionName} logo` : 'Institution logo'}
                      decoding="async"
                      loading="lazy"
                    />
                  ) : (
                    <ImagePlaceholder
                      aspectRatio="21:9"
                      className="igds-header__institution-placeholder"
                    />
                  )}
                </div>
                {institutionName && (
                  <div className="igds-header__institution-text">
                    {institutionName}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right side: Search and Actions */}
        <div className="igds-header__right">
          {/* Search section - shows when searchPlaceholder is provided */}
          {searchPlaceholder !== undefined && (
            <>
              <div className="igds-header__search">
                <InputField
                  placeholder={searchPlaceholder || 'Search'}
                  showLeadIcon={false}
                  showEndIcon={true}
                  endIcon={<MaterialIcon name="search" size={24} />}
                  onChange={(e) => onSearch?.(e.target.value)}
                  size="medium"
                />
              </div>
              <div className="igds-header__divider" />
            </>
          )}

          {/* Actions section */}
          <div className="igds-header__actions">
            {showCart && (
              <button
                className="igds-header__action-button igds-header__action-button--cart"
                onClick={onCartClick}
                aria-label="Shopping cart"
                type="button"
              >
                <MaterialIcon name="shopping_cart" size={24} />
              </button>
            )}

            {loginText && (
              <button
                className="igds-header__login-text"
                onClick={onLoginClick}
                type="button"
              >
                {loginText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
