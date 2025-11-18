import type { Meta, StoryObj } from '@storybook/react';
import { PlainFilesList } from './PlainFilesList';

const meta: Meta<typeof PlainFilesList> = {
  title: 'Components/PlainFilesList',
  component: PlainFilesList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Single file row whose overflow action appears on hover, matching the default + hover states from Figma.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    fileName: {
      control: { type: 'text' },
      description: 'Filename displayed inside the row.'
    },
    forceHover: {
      control: { type: 'boolean' },
      description: 'Forces the hover visuals to stay visible (useful for documentation).'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileName: 'document-file.pdf'
  }
};

export const HoverPreview: Story = {
  args: {
    fileName: 'spreadsheet-data.xlsx',
    forceHover: true
  }
};

export const LongFileName: Story = {
  args: {
    fileName: '2025_research-dataset_final_v2_extended-version.xlsx'
  }
};
