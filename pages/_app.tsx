import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import type { AppProps } from "next/app";
import type { ModelTypeAliases, ModelTypesToAliases } from "@glazed/types";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@self.id/react";

import publishedModel from "../lib/ceramic/model.json";

import { CERAMIC_NETWORK } from "../constants";
import Layout from "../components/Layout";
import { theme } from "../theme";

// const model: ModelTypesToAliases<any> = publishedModel;
const model: ModelTypesToAliases<ModelTypeAliases<{}, {}>> = publishedModel;

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
        <Component {...props} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
