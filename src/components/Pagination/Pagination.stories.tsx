import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, PaginationProps } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [
    (StoryComponent) => (
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          padding: '2rem',
          width: '100%',
        }}
      >
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <StoryComponent />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive pagination component for navigating through pages of content. Automatically adjusts layout for mobile and desktop viewports.'
      }
    }
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page (1-indexed)'
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages'
    },
    totalResults: {
      control: { type: 'number', min: 0 },
      description: 'Total number of results'
    },
    resultsPerPage: {
      control: { type: 'number', min: 1 },
      description: 'Number of results per page'
    },
    viewport: {
      control: 'select',
      options: ['mobile', 'desktop', 'tablet', 'auto'],
      description: 'Viewport variant for responsive behavior'
    },
    maxVisiblePages: {
      control: { type: 'number', min: 3 },
      description: 'Maximum number of page buttons to show'
    },
    showResults: {
      control: 'boolean',
      description: 'Show results text'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const InteractivePagination: React.FC<PaginationProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(props.currentPage);

  return (
    <Pagination
      {...props}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

// Default story matching Figma design
export const Default: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 12,
    totalResults: 144,
    resultsPerPage: 12,
    viewport: 'auto',
    showResults: true
  }
};

// Mobile viewport
export const Mobile: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 12,
    totalResults: 144,
    resultsPerPage: 12,
    viewport: 'mobile',
    showResults: true
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Desktop/Tablet viewport
export const Desktop: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 12,
    totalResults: 144,
    resultsPerPage: 12,
    viewport: 'desktop',
    showResults: true
  }
};

// Active page in middle
export const MiddlePage: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 6,
    totalPages: 12,
    totalResults: 144,
    resultsPerPage: 12,
    viewport: 'auto',
    showResults: true
  }
};

// Last page
export const LastPage: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 12,
    totalPages: 12,
    totalResults: 144,
    resultsPerPage: 12,
    viewport: 'auto',
    showResults: true
  }
};

// Small number of pages (no ellipsis)
export const FewPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 2,
    totalPages: 4,
    totalResults: 38,
    resultsPerPage: 10,
    viewport: 'auto',
    showResults: true
  }
};

// Large number of pages
export const ManyPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 15,
    totalPages: 50,
    totalResults: 1000,
    resultsPerPage: 20,
    viewport: 'auto',
    showResults: true
  }
};

// Without results text
export const NoResultsText: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 3,
    totalPages: 10,
    viewport: 'auto',
    showResults: false
  }
};

// Custom max visible pages
export const CustomMaxPages: Story = {
  render: (args) => <InteractivePagination {...args} />,
  args: {
    currentPage: 10,
    totalPages: 20,
    totalResults: 400,
    resultsPerPage: 20,
    viewport: 'auto',
    showResults: true,
    maxVisiblePages: 7
  }
};

// Responsive demo showing all viewports
export const ResponsiveDemo: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Mobile Layout</h3>
          <div style={{ maxWidth: '400px', border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={12}
              totalResults={144}
              resultsPerPage={12}
              viewport="mobile"
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Desktop/Tablet Layout</h3>
          <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={12}
              totalResults={144}
              resultsPerPage={12}
              viewport="desktop"
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Auto Layout (resize browser to see change)</h3>
          <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
            <Pagination
              currentPage={currentPage}
              totalPages={12}
              totalResults={144}
              resultsPerPage={12}
              viewport="auto"
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of pagination component in different viewport modes'
      }
    }
  }
};
