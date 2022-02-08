import "@fontsource/ibm-plex-mono";
import "react-big-calendar/lib/css/react-big-calendar.css";

import type { AppProps } from "next/app";
import type { ModelTypesToAliases } from "@glazed/types";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "@self.id/react";

import publishedModel from "../lib/ceramic/model.json";

import { CERAMIC_NETWORK } from "../constants";
import Layout from "../components/Layout";

const model: ModelTypesToAliases<any> = publishedModel;

const theme = extendTheme({
  // fonts: {
  //   heading: "IBM Plex Mono, monospace",
  //   body: "IBM Plex Mono, monospace",
  // },
});

function MyApp({ Component, pageProps }: AppProps) {
  const { state, ...props } = pageProps;

  return (
    <ChakraProvider theme={theme}>
      <Provider
        client={{
          ceramic: CERAMIC_NETWORK,
          connectNetwork: "testnet-clay",
          model,
        }}
        state={state}
      >
        <Layout>
          <Component {...props} />
        </Layout>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
