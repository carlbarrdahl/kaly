import { writeFile } from "node:fs/promises";
import { CeramicClient } from "@ceramicnetwork/http-client";
import { ModelManager } from "@glazed/devtools";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";

import { config } from "dotenv";
config();

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

// Connect to the local Ceramic node
const ceramic = new CeramicClient("http://localhost:7007");
ceramic.did = did;

console.log(did.id);
// Create a manager for the model
const manager = new ModelManager(ceramic);

// Create the schemas
const itemSchemaID = await manager.createSchema("Event", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Event",
  type: "object",
  properties: {
    title: {
      type: "string",
      title: "Title",
      maxLength: 160,
    },
    description: {
      type: "string",
      title: "description",
    },
    start: {
      type: "string",
      title: "start",
    },
    end: {
      type: "string",
      title: "end",
    },
  },
});

const eventsSchemaID = await manager.createSchema("Events", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Events",
  type: "object",
  properties: {
    type: "array",
    title: "items",
    items: {
      $comment: `cip88:ref:${manager.getSchemaURL(itemSchemaID)}`,
      type: "string",
    },
  },
});

const mappingSchemaID = await manager.createSchema("AttendeeMapping", {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "AttendeeMapping",
  type: "object",
  additionalProperties: { type: "object" },
  // properties: {

  //   additionalProperties: {
  //     type: "array",
  //     items: {
  //       type: "string",
  //     },
  //   },
  //   // mapping: {
  //   //   type: "object",
  //   // },
  // },
});

// Create the definition using the created schema ID
await manager.createDefinition("events", {
  name: "Events",
  description: "Collection of Calendar Events",
  schema: manager.getSchemaURL(eventsSchemaID),
});

await manager.createDefinition("attendee_mapping", {
  name: "AttendeeMapping",
  description: "Maps attendees to Events",
  schema: manager.getSchemaURL(mappingSchemaID),
});

// Create a Note with text that will be used as placeholder
// await manager.createTile(
//   "placeholder",
//   { name: "placeholder..." },
//   { schema: manager.getSchemaURL(itemSchemaID) }
// );

// await manager.createTile(
//   "placeholderItemList",
//   {
//     items: ["kjzl6cwe1jw147skte3w0wqoyhqo99obxf2fev3m2j120l1z1sdur0o3807grbz"],
//   },
//   { schema: manager.getSchemaURL(itemsListSchemaID) }
// );

// Write model to JSON file
await writeFile(
  new URL("model.json", import.meta.url),
  JSON.stringify(manager.toJSON())
);
console.log("Encoded model written to scripts/model.json file");
