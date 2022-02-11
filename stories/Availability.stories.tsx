import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import RuleConfig from "../components/features/availability/RuleConfig";

export default {
  title: "Features/Availability",
  component: RuleConfig,
  argTypes: {
    label: {
      description: "Overwritten description",
      table: {
        type: {
          summary: "Something short",
          detail: "Something really really long",
        },
      },
      control: {
        type: null,
      },
    },
  },
} as ComponentMeta<typeof RuleConfig>;

const Template: ComponentStory<typeof RuleConfig> = (args) => (
  <RuleConfig {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onUpdate: (data) => console.log(data),
};
