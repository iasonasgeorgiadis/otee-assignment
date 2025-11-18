import React from 'react';
import { Logo } from '../Brand/Logo/Logo';
import './Footer.css';

export interface FooterLink {
  /** Link text to display */
  text: string;
  /** URL for the link */
  href?: string;
  /** Click handler for the link */
  onClick?: () => void;
}

export interface FooterColumn {
  /** Column heading text */
  title: string;
  /** Links to display in this column */
  links: FooterLink[];
}

export interface FooterProps {
  /** Columns of links to display - sections show based on data presence */
  columns?: FooterColumn[];
  /** Copyright text to display - shows copyright section when provided */
  copyrightText?: string;
  /** Custom CSS class name for additional styling */
  className?: string;
  /** Logo brand to display - defaults to 'wiley' */
  logoBrand?: 'wol' | 'wiley';
  /** Logo form to display - defaults to 'full' */
  logoForm?: 'full' | 'compact';
  /** URL for the logo link - makes logo clickable when provided */
  logoHref?: string;
  /** Click handler for logo - called when logo is clicked */
  onLogoClick?: () => void;
}

/**
 * Footer component implementing the Figma design system with automatic responsive behavior
 *
 * A comprehensive footer component that automatically adapts to different viewport sizes
 * using CSS media queries. Implements the Data-Driven Visibility Pattern where sections
 * show/hide based on data presence.
 *
 * ## Responsive Behavior (Automatic)
 * - **Mobile (<768px)**: Single column, center-aligned text, reduced padding
 * - **Tablet (768px-1023px)**: Single column, center-aligned text, medium padding
 * - **Desktop (≥1024px)**: 4-column grid layout, left-aligned text, full padding
 *
 * ## Component Composition
 * - Reuses Logo component from Brand folder for consistent branding
 * - All styling uses design tokens for consistency and theming support
 * - Follows component composition best practices with proper prop exposure
 *
 * ## Data-Driven Visibility
 * - Column sections automatically show when `columns` array has items
 * - Copyright section shows when `copyrightText` is provided
 * - Logo always displays if component is rendered
 *
 * @example
 * ```tsx
 * // Full footer with all columns
 * <Footer
 *   columns={[
 *     {
 *       title: "About Wiley Online Library",
 *       links: [
 *         { text: "Privacy Policy", href: "/privacy" },
 *         { text: "Terms of Use", href: "/terms" }
 *       ]
 *     },
 *     {
 *       title: "Help & Support",
 *       links: [
 *         { text: "Contact Us", href: "/contact" },
 *         { text: "Training and Support", href: "/support" }
 *       ]
 *     }
 *   ]}
 *   copyrightText="Copyright © 1999-2025 John Wiley & Sons, Inc or related companies."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Minimal footer with just copyright
 * <Footer
 *   copyrightText="© 2025 Wiley"
 * />
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  columns = [],
  copyrightText,
  className = '',
  logoBrand = 'wiley',
  logoForm = 'full',
  logoHref,
  onLogoClick,
}) => {
  const renderLink = (link: FooterLink, index: number) => {
    const linkContent = (
      <span className="igds-footer__link-text">{link.text}</span>
    );

    if (link.href) {
      return (
        <li key={index} className="igds-footer__link-item">
          <a
            href={link.href}
            className="igds-footer__link"
            onClick={link.onClick}
          >
            {linkContent}
          </a>
        </li>
      );
    }

    return (
      <li key={index} className="igds-footer__link-item">
        <button
          className="igds-footer__link igds-footer__link--button"
          onClick={link.onClick}
          type="button"
        >
          {linkContent}
        </button>
      </li>
    );
  };

  const renderColumn = (column: FooterColumn, index: number) => (
    <section key={index} className="igds-footer__column">
      <h3 id={`footer-nav-${index}`} className="igds-footer__column-title">
        {column.title}
      </h3>
      {column.links && column.links.length > 0 && (
        <nav aria-labelledby={`footer-nav-${index}`}>
          <ul className="igds-footer__links">
            {column.links.map((link, linkIndex) => renderLink(link, linkIndex))}
          </ul>
        </nav>
      )}
    </section>
  );

  const classes = [
    'igds-footer',
    className
  ].filter(Boolean).join(' ');

  return (
    <footer className={classes}>
      {columns && columns.length > 0 && (
        <div className="igds-footer__container">
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
      )}

      {(copyrightText || logoBrand) && (
        <div className="igds-footer__footnotes">
          <div className="igds-footer__footnotes-content">
            <div className="igds-footer__logo">
              {logoHref ? (
                <a
                  href={logoHref}
                  className="igds-footer__logo-link"
                  onClick={onLogoClick}
                >
                  <Logo
                    brand={logoBrand}
                    form={logoForm}
                    colorMode="dark"
                    size="large"
                  />
                </a>
              ) : onLogoClick ? (
                <button
                  type="button"
                  className="igds-footer__logo-button"
                  onClick={onLogoClick}
                  aria-label={`${logoBrand} logo`}
                >
                  <Logo
                    brand={logoBrand}
                    form={logoForm}
                    colorMode="dark"
                    size="large"
                  />
                </button>
              ) : (
                <Logo
                  brand={logoBrand}
                  form={logoForm}
                  colorMode="dark"
                  size="large"
                />
              )}
            </div>
            {copyrightText && (
              <p className="igds-footer__copyright">{copyrightText}</p>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
