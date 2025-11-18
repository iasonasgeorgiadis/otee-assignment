import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs component that matches the Figma design system with accessible keyboard navigation and multiple size variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
      description: 'The default active tab value (uncontrolled mode)',
    },
    value: {
      control: { type: 'text' },
      description: 'The controlled active tab value',
    },
    size: {
      control: { type: 'select' },
      options: ['medium', 'small'],
      description: 'Size variant of the tabs',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether all tabs are disabled',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs with medium size
 */
export const Default: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1">
      <TabList aria-label="Example tabs">
        <Tab value="tab1">Dashboard</Tab>
        <Tab value="tab2">Analytics</Tab>
        <Tab value="tab3">Reports</Tab>
        <Tab value="tab4">Settings</Tab>
      </TabList>
      <TabPanel value="tab1">
        <h3>Dashboard Content</h3>
        <p>Welcome to your dashboard. Here you can view all your important metrics and data at a glance.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <h3>Analytics Content</h3>
        <p>Dive deep into your data with our comprehensive analytics tools and visualizations.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <h3>Reports Content</h3>
        <p>Generate and view detailed reports about your performance and activities.</p>
      </TabPanel>
      <TabPanel value="tab4">
        <h3>Settings Content</h3>
        <p>Customize your experience and configure your preferences here.</p>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Small size variant
 */
export const SmallSize: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" size="small">
      <TabList aria-label="Small tabs example">
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Details</Tab>
        <Tab value="tab3">History</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p>Overview content with smaller tab buttons.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p>Detailed information goes here.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p>Historical data and logs.</p>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Tabs with disabled state
 */
export const WithDisabledTab: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1">
      <TabList aria-label="Tabs with disabled option">
        <Tab value="tab1">Active</Tab>
        <Tab value="tab2">Also Active</Tab>
        <Tab value="tab3" disabled>Disabled</Tab>
        <Tab value="tab4">Active</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p>This tab is active and clickable.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p>This tab is also active and clickable.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p>This content won't be shown as the tab is disabled.</p>
      </TabPanel>
      <TabPanel value="tab4">
        <p>Another active tab with content.</p>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * All tabs disabled
 */
export const AllDisabled: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1" disabled>
      <TabList aria-label="All disabled tabs">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">
        <p>All tabs are disabled. User cannot switch between them.</p>
      </TabPanel>
      <TabPanel value="tab2">
        <p>Content for tab 2.</p>
      </TabPanel>
      <TabPanel value="tab3">
        <p>Content for tab 3.</p>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Controlled tabs example
 */
export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = useState('tab2');

    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => setActiveTab('tab1')} style={{ marginRight: '10px' }}>
            Activate Tab 1
          </button>
          <button onClick={() => setActiveTab('tab2')} style={{ marginRight: '10px' }}>
            Activate Tab 2
          </button>
          <button onClick={() => setActiveTab('tab3')}>
            Activate Tab 3
          </button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabList aria-label="Controlled tabs">
            <Tab value="tab1">First</Tab>
            <Tab value="tab2">Second</Tab>
            <Tab value="tab3">Third</Tab>
          </TabList>
          <TabPanel value="tab1">
            <p>First tab content. Active tab: {activeTab}</p>
          </TabPanel>
          <TabPanel value="tab2">
            <p>Second tab content. Active tab: {activeTab}</p>
          </TabPanel>
          <TabPanel value="tab3">
            <p>Third tab content. Active tab: {activeTab}</p>
          </TabPanel>
        </Tabs>
      </div>
    );
  },
};

/**
 * Vertical orientation
 */
export const VerticalOrientation: Story = {
  render: (args) => (
    <div style={{ height: '300px' }}>
      <Tabs {...args} defaultValue="tab1" orientation="vertical">
        <TabList aria-label="Vertical tabs">
          <Tab value="tab1">Profile</Tab>
          <Tab value="tab2">Preferences</Tab>
          <Tab value="tab3">Security</Tab>
          <Tab value="tab4">Notifications</Tab>
        </TabList>
        <TabPanel value="tab1">
          <h3>Profile Settings</h3>
          <p>Manage your profile information and public display settings.</p>
        </TabPanel>
        <TabPanel value="tab2">
          <h3>Preferences</h3>
          <p>Customize your application preferences and default behaviors.</p>
        </TabPanel>
        <TabPanel value="tab3">
          <h3>Security Settings</h3>
          <p>Configure security options and two-factor authentication.</p>
        </TabPanel>
        <TabPanel value="tab4">
          <h3>Notification Preferences</h3>
          <p>Choose how and when you receive notifications.</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

/**
 * Many tabs (scrollable)
 */
export const ManyTabs: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1">
      <TabList aria-label="Many tabs example">
        <Tab value="tab1">January</Tab>
        <Tab value="tab2">February</Tab>
        <Tab value="tab3">March</Tab>
        <Tab value="tab4">April</Tab>
        <Tab value="tab5">May</Tab>
        <Tab value="tab6">June</Tab>
        <Tab value="tab7">July</Tab>
        <Tab value="tab8">August</Tab>
        <Tab value="tab9">September</Tab>
        <Tab value="tab10">October</Tab>
        <Tab value="tab11">November</Tab>
        <Tab value="tab12">December</Tab>
      </TabList>
      <TabPanel value="tab1"><p>January content</p></TabPanel>
      <TabPanel value="tab2"><p>February content</p></TabPanel>
      <TabPanel value="tab3"><p>March content</p></TabPanel>
      <TabPanel value="tab4"><p>April content</p></TabPanel>
      <TabPanel value="tab5"><p>May content</p></TabPanel>
      <TabPanel value="tab6"><p>June content</p></TabPanel>
      <TabPanel value="tab7"><p>July content</p></TabPanel>
      <TabPanel value="tab8"><p>August content</p></TabPanel>
      <TabPanel value="tab9"><p>September content</p></TabPanel>
      <TabPanel value="tab10"><p>October content</p></TabPanel>
      <TabPanel value="tab11"><p>November content</p></TabPanel>
      <TabPanel value="tab12"><p>December content</p></TabPanel>
    </Tabs>
  ),
};

/**
 * Tabs with rich content
 */
export const RichContent: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue="tab1">
      <TabList aria-label="Rich content tabs">
        <Tab value="tab1">Overview</Tab>
        <Tab value="tab2">Features</Tab>
        <Tab value="tab3">Documentation</Tab>
      </TabList>
      <TabPanel value="tab1">
        <div>
          <h2>Product Overview</h2>
          <p>Our tabs component provides a clean and accessible way to organize content into separate views.</p>
          <ul>
            <li>Fully keyboard accessible</li>
            <li>ARIA compliant</li>
            <li>Multiple size variants</li>
            <li>Horizontal and vertical orientations</li>
          </ul>
        </div>
      </TabPanel>
      <TabPanel value="tab2">
        <div>
          <h2>Key Features</h2>
          <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px' }}>
              <h3>Accessibility First</h3>
              <p>Built with WCAG 2.1 AA compliance in mind.</p>
            </div>
            <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px' }}>
              <h3>Flexible API</h3>
              <p>Controlled and uncontrolled modes for any use case.</p>
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value="tab3">
        <div>
          <h2>Documentation</h2>
          <h3>Keyboard Navigation</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Key</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px' }}><kbd>Tab</kbd></td>
                <td style={{ padding: '10px' }}>Move focus into and out of the tab list</td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}><kbd>ArrowRight</kbd></td>
                <td style={{ padding: '10px' }}>Move to next tab (horizontal)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}><kbd>ArrowLeft</kbd></td>
                <td style={{ padding: '10px' }}>Move to previous tab (horizontal)</td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}><kbd>Home</kbd></td>
                <td style={{ padding: '10px' }}>Move to first tab</td>
              </tr>
              <tr>
                <td style={{ padding: '10px' }}><kbd>End</kbd></td>
                <td style={{ padding: '10px' }}>Move to last tab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Keyboard navigation demo
 */
export const KeyboardNavigation: Story = {
  render: (args) => (
    <div>
      <div style={{ marginBottom: '20px', padding: '20px', background: '#f0f4f8', borderRadius: '4px' }}>
        <h3>Keyboard Navigation Instructions</h3>
        <p>Focus the tabs below and try these keyboard shortcuts:</p>
        <ul>
          <li><strong>Tab</strong>: Enter/exit the tab list</li>
          <li><strong>Arrow Keys</strong>: Navigate between tabs</li>
          <li><strong>Home/End</strong>: Jump to first/last tab</li>
          <li><strong>Enter/Space</strong>: Activate focused tab</li>
        </ul>
      </div>
      <Tabs {...args} defaultValue="tab1">
        <TabList aria-label="Keyboard navigation demo">
          <Tab value="tab1">First</Tab>
          <Tab value="tab2">Second</Tab>
          <Tab value="tab3">Third</Tab>
          <Tab value="tab4" disabled>Disabled</Tab>
          <Tab value="tab5">Fifth</Tab>
        </TabList>
        <TabPanel value="tab1">
          <p>Press arrow keys to navigate to other tabs.</p>
        </TabPanel>
        <TabPanel value="tab2">
          <p>You navigated here using the keyboard!</p>
        </TabPanel>
        <TabPanel value="tab3">
          <p>The disabled tab will be skipped during navigation.</p>
        </TabPanel>
        <TabPanel value="tab4">
          <p>This won't be shown.</p>
        </TabPanel>
        <TabPanel value="tab5">
          <p>You've reached the last tab!</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};