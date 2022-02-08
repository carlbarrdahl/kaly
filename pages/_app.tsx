import "react-big-calendar/lib/css/react-big-calendar.css";

import type { AppProps } from "next/app";
import type { ModelTypesToAliases } from "@glazed/types";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "@self.id/react";

import publishedModel from "../lib/ceramic/model.json";

import { CERAMIC_NETWORK } from "../constants";
import Layout from "../components/Layout";

const model: ModelTypesToAliases<any> = publishedModel;

const colors = {
  blue: {
    "50": "#E5F1FF",
    "100": "#B8D7FF",
    "200": "#8ABDFF",
    "300": "#5CA3FF",
    "400": "#2E89FF",
    "500": "#006FFF",
    "600": "#0059CC",
    "700": "#004399",
    "800": "#002C66",
    "900": "#001633",
  },
};
const theme = extendTheme({
  colors,
  styles: {
    global: {
      ".rbc-event": {
        bg: colors.blue["500"],
        borderRadius: 1,
        "&:hover": {
          bg: colors.blue["600"],
        },
      },
      ".rbc-day-slot": {
        display: "block",
      },
    },
  },
  borders: {
    borderRadius: 0,
  },
  components: {
    Button: {
      defaultProps: {
        padding: 7,
      },
      baseStyle: {
        rounded: "sm",
      },
    },
    FormLabel: {
      baseStyle: {
        // textTransform: "uppercase",
        // fontSize: "xs",
        // color: "gray.500",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { state, ...props } = pageProps;

  return (
    <ChakraProvider theme={theme}>
      <Provider
        state={state}
        client={{
          ceramic: CERAMIC_NETWORK,
          connectNetwork: "testnet-clay",
          model,
        }}
      >
        <Layout>
          <Component {...props} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
