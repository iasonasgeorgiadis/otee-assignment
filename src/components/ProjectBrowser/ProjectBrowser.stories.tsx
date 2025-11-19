import type { Meta, StoryObj } from '@storybook/react';
import { ProjectBrowser } from './ProjectBrowser';
import type { ProjectBrowserAction, ProjectBrowserSection } from './ProjectBrowser';

const meta: Meta<typeof ProjectBrowser> = {
  title: 'Components/ProjectBrowser',
  component: ProjectBrowser,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Navigation pane pulled from the OTee assignment. Click the top icon button to collapse or expand the surface with a smooth animation token reused for future panes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    projectName: {
      control: { type: 'text' },
      description: 'Heading shown inside the pane.'
    },
    defaultExpanded: {
      control: { type: 'boolean' },
      description: 'Initial uncontrolled state of the pane.'
    },
    expanded: {
      control: { type: 'boolean' },
      description: 'Controlled state of the pane.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    projectName: 'Project Name'
  }
};

export const Collapsed: Story = {
  args: {
    expanded: false
  }
};

const customActions: ProjectBrowserAction[] = [
  { id: 'logic', iconName: 'functions', ariaLabel: 'Logic assets', iconVariant: 'symbols-outlined' },
  { id: 'library', iconName: 'book_2', ariaLabel: 'Library files', iconVariant: 'symbols-outlined' },
  { id: 'sync', iconName: 'sync_saved_locally', ariaLabel: 'Sync project', iconVariant: 'symbols-outlined' },
  { id: 'history', iconName: 'history', ariaLabel: 'Review history', iconVariant: 'outlined' },
  { id: 'share', iconName: 'share', ariaLabel: 'Share project', iconVariant: 'outlined' },
  { id: 'more', iconName: 'more_vert', ariaLabel: 'Overflow menu', iconVariant: 'outlined' }
];

const customSections: ProjectBrowserSection[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'pipelines', label: 'Pipelines' },
  { id: 'simulations', label: 'Simulations' },
  { id: 'deployments', label: 'Deployments' }
];

export const CustomContent: Story = {
  args: {
    projectName: 'OTee Robotics',
    actions: customActions,
    sections: customSections
  }
};
