import { TileDocument } from "@ceramicnetwork/stream-tile";
import { useCore, useViewerConnection } from "@self.id/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "../lib/axios";
import { addressToDid } from "../utils/address";
import { SelfID } from "@self.id/web";
import { Event } from "../types/Event";

async function prepareEvent(event, selfID) {
  console.log("Preparing event...");
  return {
    ...event,
    organizer: selfID.id,
    attendees: await Promise.all(
      event.attendees.map((addr) => addressToDid(addr, selfID.client.ceramic))
    ),
    start: event.start.toISOString(),
    end: event.end.toISOString(),
  };
}

export function useCreateEvent() {
  const core = useCore();
  const [{ selfID }]: any = useViewerConnection();
  console.log(selfID);
  const queryClient = useQueryClient();
  return useMutation(async (form) => {
    console.log("Creating Tile for event", form);
    // @ts-ignore
    const eventDoc = await core.dataModel.createTile(
      // @ts-ignore
      "Event",
      await prepareEvent(form, selfID)
    );

    console.log("Optimistically updating events");
    const event = addDocId(eventDoc);
    queryClient.setQueryData(["events"], (data: Event[] = []) =>
      data.concat(event)
    );

    console.log("Updating index for all attendees and organizer...");
    await axios.post(`/api/event`, event);

    // queryClient.invalidateQueries([""])

    return event;
  });
}

export function useEvents() {
  const [{ selfID }]: any = useViewerConnection();
  return useQuery(
    ["events"],
    async ({ signal }) => {
      console.log("Loading events...");
      const events: string[] = await axios.get(`/api/user/${selfID.id}`, {
        signal,
      });

      console.log("Loaded events", events);
      return await Promise.all(
        events.map((id) => loadTile(selfID.client.ceramic, id))
      );
    },
    { enabled: Boolean(selfID?.id) }
  );
}

export function useEvent(id) {
  const { ceramic } = useCore();
  return useQuery(["events", id], () => loadTile(ceramic, id));
}

async function loadTile(ceramic, id) {
  return TileDocument.load(ceramic, id).then(addDocId);
}

function addDocId(doc) {
  return { id: doc.id.toString(), ...doc.content };
}
