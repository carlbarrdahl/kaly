import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Recurrency from "../components/features/calendar/RecurrencySetting";

export default {
  title: "Features/Calendar",
  component: Recurrency,
} as ComponentMeta<typeof Recurrency>;

const Template: ComponentStory<typeof Recurrency> = (args) => (
  <Recurrency {...args} />
);

export const RecurrencySetting = Template.bind({});
RecurrencySetting.args = {};
