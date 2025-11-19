import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';

const meta = {
  title: 'Brand/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Logo component for displaying OTee brand assets. Supports automatic color mode detection and responsive sizing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
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

export const LightLogo: Story = {
  args: {
    colorMode: 'light',
    size: 'large',
  },
};

export const DarkLogo: Story = {
  args: {
    colorMode: 'dark',
    size: 'large',
    style: {
      padding: '1.5rem',
      backgroundColor: '#101114',
      borderRadius: '8px',
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo size="small" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>Small (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="large" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>Large (48px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size="xlarge" colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>XLarge (64px)</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logo sizes aligned with Figma: small, large, and xlarge. The component is responsive and scales down on smaller screens.',
      },
    },
  },
};

export const ColorModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Light Mode</h4>
        <Logo size="large" colorMode="light" />
      </div>

      <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Dark Mode</h4>
        <Logo size="large" colorMode="dark" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Logos in light and dark color modes. The component automatically selects the appropriate asset based on the colorMode prop.',
      },
    },
  },
};

export const AutoColorMode: Story = {
  render: () => (
    <div>
      <Logo size="large" colorMode="auto" />
      <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#555' }}>
        Auto mode respects the user\'s prefers-color-scheme setting.
      </p>
    </div>
  ),
};

export const CustomSize: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Logo size={40} colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>40px height</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size={72} colorMode="light" />
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#666' }}>72px height</p>
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

// export const UsageExamples: Story = {
//   render: () => (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '1rem 2rem',
//         backgroundColor: '#123c80',
//         borderRadius: '8px',
//         color: 'white'
//       }}>
//         <Logo colorMode="dark" size="large" />
//         <nav style={{ display: 'flex', gap: '2rem' }}>
//           <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Browse</a>
//           <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Search</a>
//           <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Account</a>
//         </nav>
//       </div>

//       <div style={{
//         padding: '2rem',
//         backgroundColor: '#f8f9fb',
//         borderRadius: '8px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         flexWrap: 'wrap',
//         gap: '1rem'
//       }}>
//         <Logo colorMode="light" size="large" />
//         <div style={{ fontSize: '0.875rem', color: '#6f7071' }}>
//           © 2024 OTee. All rights reserved.
//         </div>
//       </div>
//     </div>
//   ),
// };
