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
  type: "object",
  title: "Event",
  properties: {
    organizer: {
      type: "string",
    },
    start: {
      type: "string",
    },
    end: {
      type: "string",
    },
    duration: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    url: {
      type: "string",
    },
    attendees: {
      type: "array",
      items: {
        type: "string",
      },
    },
    location: {
      type: "string",
    },
    geo: {
      type: "object",
      properties: {
        lat: {
          type: "number",
        },
        lng: {
          type: "number",
        },
      },
      required: ["lat", "lng"],
      additionalProperties: false,
    },
    rrule: {
      type: "string",
    },
    classification: {
      type: "string",
      enum: ["public", "private", "confidential"],
    },
  },
  required: ["organizer", "start", "title"],
  additionalProperties: false,
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

// Write model to JSON file
await writeFile(
  new URL("model.json", import.meta.url),
  JSON.stringify(manager.toJSON())
);
console.log("Encoded model written to scripts/model.json file");
