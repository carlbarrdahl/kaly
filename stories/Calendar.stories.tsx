import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Calendar from "../components/features/calendar/Calendar";

import events from "./eventsMock";
export default {
  title: "Features/Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  events: events as any,
};
