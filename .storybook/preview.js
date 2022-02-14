import { addDecorator } from "@storybook/react";

import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import { theme } from "../theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

addDecorator((storyFn) => (
  <ChakraProvider theme={theme}>{storyFn()}</ChakraProvider>
));
