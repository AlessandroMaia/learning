import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { action } from "@storybook/addon-actions";

const meta = {
  component: Button,
  args: {
    children: "Button",
    onClick: action("Clicked")
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean"
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      control: "select",
      table: {
        type: {
          summary: "enum (string)",
          detail: "'default' | 'sm' | 'lg' | 'icon'"
        }
      }
    },
    variant: {
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      control: "select"
    },
    asChild: {
      table: {
        type: {
          summary: "boolean"
        }
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="translate-x-1/2 transform">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "default",
  }
};

export const Secondary: Story = {
  args: {
    children: "secondary",
    variant: "secondary"
  },
  render: (props) => (
    <Button {...props}>
      <span className="mr-1">🚀</span>
      secondary
    </Button>
  )
};

export const Outline: Story = {
  args: {
    children: "outline",
    variant: "outline"
  }
};
