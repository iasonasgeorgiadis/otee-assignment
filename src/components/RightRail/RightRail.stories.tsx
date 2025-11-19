import type { Meta, StoryObj } from '@storybook/react';
import { RightRail } from './RightRail';
import type { RightRailAction } from './RightRail';

const meta: Meta<typeof RightRail> = {
  title: 'Components/RightRail',
  component: RightRail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Vertical toolbar sidebar with icon buttons that toggles between active and selected states. Click the yellow button at the bottom to see the smooth icon animation transition.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: { type: 'boolean' },
      description: 'Controlled selected state of the rail.'
    },
    defaultSelected: {
      control: { type: 'boolean' },
      description: 'Initial selected state when uncontrolled.'
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback fired when the selection state changes.'
    },
    onActionSelect: {
      action: 'actionSelected',
      description: 'Callback fired when an action button is clicked.'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    defaultSelected: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Default active state with sparkle icon in the primary button.'
      }
    }
  }
};

export const Selected: Story = {
  args: {
    selected: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Selected state with arrow icon and lighter background. Note the left border only styling.'
      }
    }
  }
};

export const Interactive: Story = {
  args: {
    defaultSelected: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the yellow button to toggle between states and see the smooth icon crossfade animation.'
      }
    }
  }
};

const customActions: RightRailAction[] = [
  { id: 'settings', iconName: 'settings', ariaLabel: 'Settings', iconVariant: 'symbols-outlined' },
  { id: 'notifications', iconName: 'notifications', ariaLabel: 'Notifications', iconVariant: 'symbols-outlined' },
  { id: 'account', iconName: 'account_circle', ariaLabel: 'Account', iconVariant: 'symbols-outlined' },
  { id: 'info', iconName: 'info', ariaLabel: 'Information', iconVariant: 'symbols-outlined' }
];

export const CustomActions: Story = {
  args: {
    actions: customActions,
    defaultSelected: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Right rail with custom action buttons demonstrating the flexible API.'
      }
    }
  }
};

export const Controlled: Story = {
  args: {
    selected: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled component where the parent manages the selected state. Toggle the "selected" control to change state.'
      }
    }
  }
};
