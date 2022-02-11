import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ManageCalendars from "../components/features/calendar/Manage";

export default {
  title: "Features/ManageCalendars",
  component: ManageCalendars,
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
} as ComponentMeta<typeof ManageCalendars>;

const Template: ComponentStory<typeof ManageCalendars> = (args) => (
  <ManageCalendars {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onUpdate: (data) => console.log(data),
};
