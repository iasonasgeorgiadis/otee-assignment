import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, type TooltipPlacement } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltip component that mirrors the IGDS Figma spec with four arrow placements and optional supporting text.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Placement of the tooltip relative to its anchor'
    },
    hasBody: {
      control: { type: 'boolean' },
      description: 'Toggles the supporting body text'
    },
    title: {
      control: { type: 'text' },
      description: 'Title text shown in the tooltip'
    },
    body: {
      control: { type: 'text' },
      description: 'Body text shown beneath the title'
    }
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    placement: 'top',
    title: 'Title',
    body: 'Body text'
  }
};

export const Bottom: Story = {
  args: {
    placement: 'bottom',
    title: 'Title',
    body: 'Body text'
  }
};

export const Left: Story = {
  args: {
    placement: 'left',
    title: 'Title',
    body: 'Body text'
  }
};

export const Right: Story = {
  args: {
    placement: 'right',
    title: 'Title',
    body: 'Body text'
  }
};

export const WithoutBody: Story = {
  args: {
    placement: 'top',
    title: 'Title',
    hasBody: false
  }
};

export const Placements: Story = {
  args: {
    title: 'Title',
    body: 'Body text'
  },
  render: (args) => {
    const placements: TooltipPlacement[] = ['top', 'bottom', 'left', 'right'];

    return (
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {placements.map((placement) => (
          <Tooltip
            key={placement}
            {...args}
            placement={placement}
          />
        ))}
      </div>
    );
  }
};
