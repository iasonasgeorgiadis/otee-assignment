import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Brand/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Logo component for displaying brand assets. Supports both WOL (Wiley Online Library) and Wiley corporate brands with automatic color mode detection and responsive sizing.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: { type: 'select' },
      options: ['wol', 'wiley'],
      description: 'Brand variant to display',
      table: {
        defaultValue: { summary: 'wol' },
      },
    },
    form: {
      control: { type: 'select' },
      options: ['full', 'compact'],
      description: 'Logo form - full includes text, compact is symbol only',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'large', 'xlarge'],
      description: 'Logo sizes aligned with Figma naming convention',
      table: {
        defaultValue: { summary: 'large' },
      },
    },
    colorMode: {
      control: { type: 'select' },
      options: ['light', 'dark', 'auto'],
      description: 'Color mode for the logo - auto detects user preference',
      table: {
        defaultValue: { summary: 'auto' },
      },
    },
    alt: {
      control: { type: 'text' },
      description: 'Custom alt text for accessibility (auto-generated if not provided)',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// No default story - user must specify brand and form

// Brand variants
export const WOLBrand: Story = {
  args: {
    brand: 'wol',
    form: 'full',
    size: 'large',
    colorMode: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'WOL (Wiley Online Library) brand logo with full branding including text.',
      },
    },
  },
};

export const WileyBrand: Story = {
  args: {
    brand: 'wiley',
    form: 'full',
    size: 'large',
    colorMode: 'light',
  },
  parameters: {
    docs: {
      description: {
        story: 'Wiley corporate brand logo - icon and text are always displayed together as one unified logo.',
      },
    },
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wol" form="full" size="small" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>Small (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wol" form="full" size="large" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>Large (48px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wol" form="full" size="xlarge" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>XLarge (64px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo sizes aligned with Figma: small, large, and xlarge. The component is responsive and will scale down on smaller screens.',
      },
    },
  },
};

// Logo forms
export const Forms: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wol" form="full" size="large" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>WOL Full</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wol" form="compact" size="large" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>WOL Compact</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wiley" form="full" size="large" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>Wiley Full</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wiley" form="compact" size="large" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>Wiley Compact</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available logo forms. Both brands offer full and compact forms. Wiley full form always displays the complete unified logo (symbol + text together).',
      },
    },
  },
};

// Color modes
export const ColorModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Light mode */}
      <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Light Mode</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Logo brand="wol" form="full" size="large" colorMode="light" />
          <Logo brand="wiley" form="full" size="large" colorMode="light" />
        </div>
      </div>

      {/* Dark mode */}
      <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Dark Mode</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Logo brand="wol" form="full" size="large" colorMode="dark" />
          <Logo brand="wiley" form="full" size="large" colorMode="dark" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logos in both light and dark color modes. The component automatically selects the appropriate logo variant based on the colorMode prop.',
      },
    },
  },
};

// Usage examples
export const NavigationUsage: Story = {
  render: () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#123c80',
      borderRadius: '8px',
      color: 'white'
    }}>
      <Logo brand="wol" form="full" size="large" colorMode="dark" />
      <nav style={{ display: 'flex', gap: '2rem' }}>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Browse</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Search</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Account</a>
      </nav>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using the logo in a navigation header with appropriate size and color mode for the background.',
      },
    },
  },
};

export const FooterUsage: Story = {
  render: () => (
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8f9fb',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <Logo brand="wiley" form="full" size="large" colorMode="light" />
      <div style={{ fontSize: '0.875rem', color: '#6f7071' }}>
        © 2024 Wiley. All rights reserved.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using the Wiley logo in a footer context.',
      },
    },
  },
};

// Custom size example
export const CustomSize: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wol" form="full" size={40} colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>40px height</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo brand="wiley" form="compact" size={64} colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>64px height</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom logo sizes using numeric pixel values for precise control.',
      },
    },
  },
};
