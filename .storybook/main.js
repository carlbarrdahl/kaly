module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "@chakra-ui/storybook-addon",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  typescript: {
    reactDocgen: false,
  },
};
