import { TileDocument } from "@ceramicnetwork/stream-tile";
import { useCore, useViewerConnection } from "@self.id/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "../lib/axios";
import { Event } from "../schemas/event";

async function prepareEvent(event, selfID) {
  console.log("Preparing event...");
  return {
    ...event,
    organizer: selfID.id,
    // attendees: await Promise.all(
    //   event.attendees.map((addr) => addressToDid(addr, selfID.client.ceramic))
    // ),
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

    return event;
  });
}

export function useUpdateEvent() {
  const { ceramic } = useCore();
  return useMutation(async (event: Event) => {
    console.log("Update event", event);
    return TileDocument.load<Event>(ceramic, event.id).then(
      (doc) => doc && doc.update({ ...doc.content, ...event })
    );
  });
}

export function useEvents() {
  const [{ selfID }]: any = useViewerConnection();
  return useQuery<Event[], Error>(
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
  return useQuery<Event, Error>(["events", id], async () =>
    loadTile(ceramic, id)
  );
}

async function loadTile(ceramic, id) {
  return TileDocument.load(ceramic, id).then(addDocId);
}

function addDocId(doc) {
  return { id: doc.id.toString(), ...doc.content };
}
