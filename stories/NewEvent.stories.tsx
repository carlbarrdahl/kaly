import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import NewEventComponent from "../components/features/calendar/NewEvent";

export default {
  title: "Features/Calendar",
  component: NewEventComponent,
} as ComponentMeta<typeof NewEventComponent>;

const Template: ComponentStory<typeof NewEventComponent> = (args) => (
  <NewEventComponent {...args} />
);

export const NewEvent = Template.bind({});
NewEvent.args = {
  event: {
    start: new Date(),
  },
};
