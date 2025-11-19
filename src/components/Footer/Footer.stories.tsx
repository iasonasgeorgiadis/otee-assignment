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
    logoColorMode: {
      description: 'Color mode for the OTee logo',
      control: {
        type: 'select',
        options: ['light', 'dark', 'auto'],
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
      title: "About OTee",
      links: [
        { text: "Privacy Policy", href: "/privacy" },
        { text: "Terms of Use", href: "/terms" },
        { text: "About Cookies", href: "/cookies" },
        { text: "Manage Cookies", onClick: () => console.log('Manage cookies') },
        { text: "Accessibility", href: "/accessibility" },
        { text: "Research DE&I Statement", href: "/policies" },
        { text: "Global Access", href: "/global" },
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
      title: "Connect with OTee",
      links: [
        { text: "Community Hub", href: "/community" },
        { text: "Press Room", href: "/press" },
      ],
    },
  ],
  copyrightText: "Copyright © 2024 OTee. All rights reserved, including rights for text and data mining and training of artificial intelligence technologies or similar technologies.",
  logoColorMode: 'dark',
};

/**
 * Default footer with all sections and OTee branding.
 * This story demonstrates the full responsive behavior - resize your viewport to see it adapt.
 */
export const Default: Story = {
  args: defaultFooterData,
};

/**
 * Footer showcasing the light logo variant for dark backgrounds.
 */
export const LightLogo: Story = {
  args: {
    ...defaultFooterData,
    logoColorMode: 'light',
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
    copyrightText: "© 2025 OTee",
  },
};

/**
 * Footer with only copyright - minimal implementation.
 * Demonstrates that columns are optional and component adapts.
 */
export const CopyrightOnly: Story = {
  args: {
    copyrightText: "Copyright © 2025 OTee. All rights reserved.",
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
