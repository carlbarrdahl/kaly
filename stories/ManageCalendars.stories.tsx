import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ManageCalendars from "../components/features/calendar/Manage";

export default {
  title: "Features/ManageCalendars",
  component: ManageCalendars,
} as ComponentMeta<typeof ManageCalendars>;

const Template: ComponentStory<typeof ManageCalendars> = (args) => (
  <ManageCalendars {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onUpdate: (data) => console.log(data),
};
