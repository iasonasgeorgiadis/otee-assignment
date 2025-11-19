import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const institutionLogoOptions = {
  None: undefined,
  'Atypon (JPEG)': '/institutions/atypon-brand.jpg',
  'Columbia University (PNG)': '/institutions/columbia-university-logo.png'
} as const;

type InstitutionLogoOption = keyof typeof institutionLogoOptions;
const defaultInstitutionLogo: InstitutionLogoOption = 'Atypon (JPEG)';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (StoryComponent) => (
      <div style={{ width: '100%', maxWidth: '100vw' }}>
        <StoryComponent />
      </div>
    )
  ],
  tags: ['autodocs'],
  args: {
    institutionLogo: defaultInstitutionLogo,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Responsive navigation header with automatic layout adaptation across desktop, tablet, and mobile viewports.

## Features

- **Full-width layout** with left/right content grouping
- **Data-driven visibility** - sections hide when data is undefined
- **Dynamic search** that expands to fill available space
- **Three viewport variants** with optimized layouts
- **Accessible** with ARIA labels and keyboard navigation

## Usage

\`\`\`tsx
import { Header } from '@/components';

<Header
  viewport="desktop"
  institutionLogo="/logo.png"
  institutionName="Library Access"
  searchPlaceholder="Search"
  showCart={true}
  loginText="Login"
/>
\`\`\`

## Data-Driven Visibility

Omit props to hide sections:
- No \`searchPlaceholder\` = no search
- No \`institutionLogo\` = no institution section
- \`showCart: false\` = no cart icon
- No \`loginText\` = no login button

## Viewport Variants

- **Desktop**: Full features with institution branding and search
- **Tablet**: Simplified without institution text
- **Mobile**: Minimal with essential actions only
        `
      }
    }
  },
  argTypes: {
    viewport: {
      control: { type: 'select' },
      options: ['desktop', 'tablet', 'mobile'],
      description: 'Controls the responsive layout variant of the header. Desktop shows all features, tablet simplifies the layout, and mobile provides minimal essential actions.',
      table: {
        type: { summary: '"desktop" | "tablet" | "mobile"' },
        defaultValue: { summary: 'desktop' },
        category: 'Layout'
      }
    },
    institutionLogo: {
      options: Object.keys(institutionLogoOptions) as InstitutionLogoOption[],
      mapping: institutionLogoOptions,
      control: { type: 'select' },
      description: 'Institution logo image path. When provided, displays the institution branding. Leave undefined to hide institution section entirely (data-driven visibility).',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Branding'
      }
    },
    institutionName: {
      control: 'text',
      description: 'Institution name displayed next to the logo on desktop viewport. Automatically hidden on tablet/mobile to save space. Leave undefined to hide.',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Branding'
      }
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input. When undefined, the entire search section is hidden (data-driven visibility). The search input expands dynamically based on available space.',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Search'
      }
    },
    showCart: {
      control: 'boolean',
      description: 'Controls visibility of the shopping cart icon. Set to false to hide the cart button entirely.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Actions'
      }
    },
    loginText: {
      control: 'text',
      description: 'Text for the login/register button. When undefined, the login button is hidden. Use concise text on mobile (e.g., "Login") and can be more descriptive on desktop (e.g., "Login / Register").',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Actions'
      }
    },
    onSearch: {
      action: 'searched',
      description: 'Callback fired when user submits a search query',
      table: {
        type: { summary: '(query: string) => void' },
        category: 'Events'
      }
    },
    onCartClick: {
      action: 'cart clicked',
      description: 'Callback fired when the cart icon is clicked',
      table: {
        type: { summary: '() => void' },
        category: 'Events'
      }
    },
    onLoginClick: {
      action: 'login clicked',
      description: 'Callback fired when the login/register button is clicked',
      table: {
        type: { summary: '() => void' },
        category: 'Events'
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names to apply to the header container for custom styling',
      table: {
        type: { summary: 'string | undefined' },
        category: 'Styling'
      }
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Desktop Stories
export const Desktop: Story = {
  args: {
    institutionLogo: defaultInstitutionLogo,
    viewport: 'desktop',
    institutionName: 'Access by Atypon Institution',
    searchPlaceholder: 'Search',
    showCart: true,
    loginText: 'Login / Register',
  },
  parameters: {
    docs: {
      description: {
        story: `
The default desktop header with all features enabled. This configuration shows:
- Full institution branding (logo + text)
- Expandable search bar that grows to fill available space
- Shopping cart icon for e-commerce functionality
- Login/Register button with full text label

**Best for:** Desktop and laptop screens (1440px+) where screen real estate allows for complete functionality.
        `
      }
    }
  }
};

export const DesktopWithoutInstitution: Story = {
  args: {
    institutionLogo: 'None',
    viewport: 'desktop',
    searchPlaceholder: 'Search',
    showCart: true,
    loginText: 'Login / Register',
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates the **data-driven visibility pattern**. When no institution logo is provided, the entire institution section is automatically hidden, giving more space to the search bar.

This pattern eliminates the need for explicit visibility props - the component intelligently adapts based on the data you provide.
        `
      }
    }
  }
};

export const DesktopWithoutSearch: Story = {
  args: {
    institutionLogo: defaultInstitutionLogo,
    viewport: 'desktop',
    institutionName: 'Access by Atypon Institution',
    showCart: true,
    loginText: 'Login / Register',
  },
};

export const DesktopMinimal: Story = {
  args: {
    institutionLogo: 'None',
    viewport: 'desktop',
    showCart: true,
    loginText: 'Login / Register',
  },
  parameters: {
    docs: {
      description: {
        story: `
The most minimal desktop configuration. Perfect for:
- Simple applications without search functionality
- Admin panels with separate navigation
- Landing pages with focused user actions

Note how the header maintains proper left/right alignment even with minimal content.
        `
      }
    }
  }
};

// Tablet Stories
export const Tablet: Story = {
  args: {
    institutionLogo: 'None',
    viewport: 'tablet',
    showCart: true,
  },
};

// Mobile Stories
export const Mobile: Story = {
  args: {
    institutionLogo: 'None',
    viewport: 'mobile',
    showCart: true,
  },
};

// Interactive Stories
export const Interactive: Story = {
  args: {
    institutionLogo: defaultInstitutionLogo,
    viewport: 'desktop',
    institutionName: 'Access by Atypon Institution',
    searchPlaceholder: 'Search for articles, books, and more...',
    showCart: true,
    loginText: 'Login / Register',
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the interactive features of the Header component.
Try clicking the login button, cart icon, or typing in the search field.
        `
      }
    }
  }
};

// Custom Login Text
export const CustomLoginText: Story = {
  args: {
    institutionLogo: defaultInstitutionLogo,
    viewport: 'desktop',
    institutionName: 'University Library',
    searchPlaceholder: 'Search',
    showCart: true,
    loginText: 'Sign In / Create Account',
  },
};

// Long Institution Name
export const LongInstitutionName: Story = {
  args: {
    institutionLogo: defaultInstitutionLogo,
    viewport: 'desktop',
    institutionName: 'International Institute of Technology and Advanced Research',
    searchPlaceholder: 'Search',
    showCart: true,
    loginText: 'Login / Register',
  },
  parameters: {
    docs: {
      description: {
        story: `
This story tests how the header handles longer institution names.
The design should gracefully accommodate the additional text length.
        `
      }
    }
  }
};

// All Viewport Comparison
export const AllViewports: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2em', fontWeight: '600' }}>Desktop</h3>
        <div style={{ width: '100%' }}>
          <Header
            {...args}
            viewport="desktop"
            institutionName="Access by Atypon Institution"
            searchPlaceholder="Search"
          />
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2em', fontWeight: '600' }}>Tablet</h3>
        <div style={{ width: '100%' }}>
          <Header
            {...args}
            viewport="tablet"
          />
        </div>
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2em', fontWeight: '600' }}>Mobile</h3>
        <div style={{ width: '100%' }}>
          <Header
            {...args}
            viewport="mobile"
          />
        </div>
      </div>
    </div>
  ),
  args: {
    showCart: true,
    loginText: 'Login / Register',
  },
  parameters: {
    docs: {
      description: {
        story: `
This story shows all three viewport variants side by side for easy comparison.
Notice how the layout adapts for each screen size while maintaining brand consistency.
        `
      }
    }
  }
};
