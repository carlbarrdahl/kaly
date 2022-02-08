import { CeramicClient } from "@ceramicnetwork/http-client";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";

import modelAliases from "./model.json";

import { config } from "dotenv";
import { Core } from "@self.id/core";
config();

let client: CeramicClient;
// const ceramicURL = "http://localhost:7007";
const ceramicURL = "https://ceramic-private-clay.3boxlabs.com";
export async function createClient() {
  if (client) return client;

  console.log(process.env.SEED);
  if (!process.env.SEED) {
    throw new Error("Missing SEED environment variable");
  }

  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, "base16");
  // Create and authenticate the DID
  const did = new DID({
    provider: new Ed25519Provider(seed),
    resolver: getResolver(),
  });

  await did.authenticate();

  const ceramic = new CeramicClient(ceramicURL);
  ceramic.setDID(did);

  const model = new DataModel({ ceramic, model: modelAliases });
  const dataStore = new DIDDataStore({ ceramic, model });

  ceramic.dataModel = model;
  ceramic.dataStore = dataStore;
  client = ceramic;

  return ceramic;
}
