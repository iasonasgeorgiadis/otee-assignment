import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Columns of links to display in the footer',
    },
    copyrightText: {
      description: 'Copyright text to display in the footer',
    },
    className: {
      description: 'Custom CSS class name for additional styling',
    },
    logoBrand: {
      description: 'Logo brand to display',
      control: {
        type: 'select',
        options: ['wol', 'wiley'],
      },
    },
    logoForm: {
      description: 'Logo form to display',
      control: {
        type: 'select',
        options: ['full', 'compact'],
      },
    },
    logoHref: {
      description: 'URL for the logo link - makes logo clickable when provided',
    },
    onLogoClick: {
      description: 'Click handler for logo - called when logo is clicked',
      action: 'logo-clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default footer data for all stories
const defaultFooterData = {
  columns: [
    {
      title: "About Wiley Online Library",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Use", href: "/terms" },
        { text: "About Cookies", href: "/cookies" },
        { text: "Manage Cookies", onClick: () => console.log('Manage cookies') },
        { text: "Accessibility", href: "/accessibility" },
        { text: "Wiley Research DE&I Statement and Publishing Policies", href: "/policies" },
        { text: "Developing World Access", href: "/developing-world" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { text: "Contact Us", href: "/contact" },
        { text: "Training and Support", href: "/training" },
        { text: "DMCA & Reporting Piracy", href: "/dmca" },
        { text: "Sitemap", href: "/sitemap" },
      ],
    },
    {
      title: "Opportunities",
      links: [
        { text: "Subscription Agents", href: "/agents" },
        { text: "Advertisers & Corporate Partners", href: "/partners" },
      ],
    },
    {
      title: "Connect with Wiley",
      links: [
        { text: "The Wiley Network", href: "/network" },
        { text: "Wiley Press Room", href: "/press" },
      ],
    },
  ],
  copyrightText: "Copyright © 1999-2025 John Wiley & Sons, Inc or related companies. All rights reserved, including rights for text and data mining and training of artificial intelligence technologies or similar technologies.",
};

/**
 * Default footer with all sections and Wiley branding.
 * This story demonstrates the full responsive behavior - resize your viewport to see it adapt.
 */
export const Default: Story = {
  args: defaultFooterData,
};

/**
 * Footer with WOL (Wiley Online Library) branding.
 */
export const WOLBranding: Story = {
  args: {
    ...defaultFooterData,
    logoBrand: 'wol',
  },
};

/**
 * Footer with compact logo form.
 */
export const CompactLogo: Story = {
  args: {
    ...defaultFooterData,
    logoForm: 'compact',
  },
};

/**
 * Footer with limited columns - demonstrates data-driven visibility.
 * Only shows the provided columns.
 */
export const LimitedColumns: Story = {
  args: {
    columns: [
      {
        title: "About",
        links: [
          { text: "Privacy Policy", href: "/privacy" },
          { text: "Terms of Use", href: "/terms" },
        ],
      },
      {
        title: "Support",
        links: [
          { text: "Contact Us", href: "/contact" },
          { text: "Help", href: "/help" },
        ],
      },
    ],
    copyrightText: "© 2025 Wiley",
  },
};

/**
 * Footer with only copyright - minimal implementation.
 * Demonstrates that columns are optional and component adapts.
 */
export const CopyrightOnly: Story = {
  args: {
    copyrightText: "Copyright © 2025 John Wiley & Sons, Inc. All rights reserved.",
  },
};

/**
 * Footer with no copyright text - shows only columns and logo.
 */
export const NoCopyright: Story = {
  args: {
    columns: defaultFooterData.columns.slice(0, 2), // Show only first 2 columns
  },
};

/**
 * Footer with mixed link types - some with href, some with onClick.
 * Demonstrates handling of different link behaviors.
 */
export const MixedLinkTypes: Story = {
  args: {
    columns: [
      {
        title: "Quick Links",
        links: [
          { text: "External Link", href: "https://example.com" },
          { text: "Internal Link", href: "/internal" },
          { text: "Button Action", onClick: () => alert('Button clicked!') },
          { text: "Console Log", onClick: () => console.log('Logged to console') },
        ],
      },
    ],
    copyrightText: "© 2025 Example Corp",
  },
};

/**
 * Footer with clickable logo that navigates to homepage.
 * The logo has a hover effect with transparency.
 */
export const ClickableLogo: Story = {
  args: {
    ...defaultFooterData,
    logoHref: '/',
    onLogoClick: () => console.log('Logo clicked!'),
  },
};

/**
 * Footer with logo button (no href).
 * Uses onClick handler only for JavaScript actions.
 */
export const LogoButton: Story = {
  args: {
    columns: defaultFooterData.columns.slice(0, 2),
    copyrightText: defaultFooterData.copyrightText,
    onLogoClick: () => alert('Logo button clicked!'),
  },
};

/**
 * Responsive footer demonstration.
 * Use Storybook's viewport controls to see how it adapts:
 * - Desktop (≥1024px): 4-column grid layout
 * - Tablet (768px-1023px): Single column, center-aligned
 * - Mobile (<768px): Single column, center-aligned with reduced padding
 */
export const ResponsiveDemo: Story = {
  args: defaultFooterData,
  parameters: {
    docs: {
      description: {
        story: 'Use the viewport controls above to see the responsive behavior at different screen sizes.',
      },
    },
  },
};