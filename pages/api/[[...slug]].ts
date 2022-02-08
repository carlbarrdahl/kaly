import { NextApiRequest, NextApiResponse } from "next";
import { TileDocument } from "@ceramicnetwork/stream-tile";

import nc from "next-connect";
import { createClient } from "../../lib/ceramic";
import CeramicClient from "@ceramicnetwork/http-client";

const attendees = {
  did: {
    events: ["kjzl6cwe1jw14ah4g4dx513qlg4bpc862e062lmd4uwtme84azamugwl81vdg9p"],
  },
};

const handler = nc<NextApiRequest, NextApiResponse>({ attachParams: true })
  //   .use("/api/ical", (req, res) => res.send(""))
  .post<{ params: {} }>("/api/event", async (req, res) => {
    console.log("Updating index for all attendees and organizer...");
    const event = req.body;

    console.log("INCOMING", event);
    const ceramic = await createClient();
    await Promise.all(
      event.attendees
        .concat(event.organizer) // Include creator of event to index
        .map(async (did: string) => updateIndex(ceramic, did, event.id))
    );
    res.send({ status: "success" });
  })
  .get<{ params: { did: string } }>("/api/user/:did", async (req, res) => {
    const { did } = req.params;
    const ceramic = await createClient();

    const events = selectEvents(await getIndex(ceramic, did));

    res.send(events);
  });

export default handler;

const selectEvents = (index: TileDocument<{ events: string[] }>) =>
  index?.content.events ?? [];

const FAMILY = "dcal";

async function updateIndex(
  ceramic: CeramicClient,
  did: string,
  eventId: string
) {
  const index = await getIndex(ceramic, did, true);
  console.log("-----");
  console.log(index.controllers, index.id.toString());
  console.log("-----");
  const events = selectEvents(index);
  console.log(`Index found with ${events.length} events`);
  console.log("Adding the new event streamId to the index", eventId);
  return index.update({ events: [...events, eventId] });
}

async function getIndex(
  ceramic: CeramicClient,
  did: string,
  shouldAnchor = false
) {
  console.log("Getting index for:", did);
  const index = await TileDocument.deterministic<{ events: string[] }>(
    ceramic,
    { family: FAMILY, tags: ["events", did] },
    { anchor: shouldAnchor, publish: shouldAnchor }
  );

  console.log("Index found", index);

  return index;
}
