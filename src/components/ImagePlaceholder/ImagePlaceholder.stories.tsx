import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImagePlaceholder } from './ImagePlaceholder';

const meta = {
  title: 'Components/ImagePlaceholder',
  component: ImagePlaceholder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Simple placeholder component with multiple aspect ratios for consistent image placeholders across the design system. The icon automatically scales to 70% of the container height for optimal visual proportion.'
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aspectRatio: {
      control: { type: 'select' },
      options: ['1:1', '4:5', '16:9', '21:9', '6:4'],
      description: 'The aspect ratio of the placeholder',
    },
    children: {
      description: 'Custom placeholder content (defaults to outlined image icon)',
    },
    className: {
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof ImagePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllAspectRatios: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#6f7071' }}>1:1 (Square)</h4>
        <ImagePlaceholder aspectRatio="1:1" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#6f7071' }}>4:5 (Portrait)</h4>
        <ImagePlaceholder aspectRatio="4:5" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#6f7071' }}>16:9 (Landscape)</h4>
        <ImagePlaceholder aspectRatio="16:9" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#6f7071' }}>21:9 (Ultra-wide)</h4>
        <ImagePlaceholder aspectRatio="21:9" />
      </div>
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', color: '#6f7071' }}>6:4 (Classic)</h4>
        <ImagePlaceholder aspectRatio="6:4" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available aspect ratios matching the Figma design.',
      },
    },
  },
};