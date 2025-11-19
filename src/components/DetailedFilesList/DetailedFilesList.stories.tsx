import type { Meta, StoryObj } from '@storybook/react';
import { DetailedFilesList } from './DetailedFilesList';

const meta: Meta<typeof DetailedFilesList> = {
  title: 'Components/DetailedFilesList',
  component: DetailedFilesList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Two-line file row with thumbnail, metadata, and destructive icon button. Mirrors the detailed-files-list specs from Figma.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    fileName: {
      control: { type: 'text' },
      description: 'Primary filename text.'
    },
    fileSize: {
      control: { type: 'text' },
      description: 'Secondary metadata string (e.g., file size).'
    },
    fileTypeLabel: {
      control: { type: 'text' },
      description: 'Uppercase label shown inside the thumbnail when you opt out of the icon.'
    },
    fileTypeIcon: {
      control: { type: 'text' },
      description: 'Material icon name rendered inside the thumbnail.'
    },
    fileTypeIconVariant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'symbols-outlined'],
      description: 'Material icon variant used for the thumbnail glyph.'
    },
    forceHover: {
      control: { type: 'boolean' },
      description: 'Forces hover visuals for documentation/QA.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileName: 'document-file.pdf',
    fileSize: '82.0 KB'
  }
};

export const HoverPreview: Story = {
  args: {
    ...Default.args,
    forceHover: true
  }
};

export const AlternateIcon: Story = {
  args: {
    fileName: 'brand-assets.zip',
    fileSize: '1.2 GB',
    fileTypeIcon: 'folder'
  }
};

export const WithLabel: Story = {
  args: {
    fileName: 'source-files.ai',
    fileSize: '36.4 MB',
    fileTypeLabel: 'AI'
  }
};
