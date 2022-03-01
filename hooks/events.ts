import { TileDocument } from "@ceramicnetwork/stream-tile";
import { useCore, useViewerConnection } from "@self.id/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { Event } from "../schemas/event";

let ceramicLit;
async function createLit() {
  if (ceramicLit) {
    return ceramicLit;
  }
  const { Integration } = await import("lit-ceramic-sdk");
  // TODO: get URL from instance
  ceramicLit = new Integration("https://ceramic-clay.3boxlabs.com", "ethereum");
  ceramicLit.startLitClient(window);
  return ceramicLit;
}

export function useCreateEvent() {
  const core = useCore();
  const [{ selfID }]: any = useViewerConnection();
  const queryClient = useQueryClient();
  return useMutation(async (form) => {
    try {
      console.log("Creating Tile for event", form);
      // @ts-ignore
      form.accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain: "ethereum",
          method: "eth_getBalance",
          parameters: [":userAddress", "latest"],
          returnValueTest: {
            comparator: ">=",
            value: "10000000000000",
          },
        },
      ];

      console.log("prepared", await prepareEvent(form, selfID));
      const { accessControlConditions, ...event } = await prepareEvent(
        form,
        selfID
      );

      let eventId;
      if (accessControlConditions) {
        eventId = await createLit()
          .then((lit) =>
            lit.encryptAndWrite(JSON.stringify(event), accessControlConditions)
          )
          .catch((err) => {
            console.log(err);
          });
      } else {
        eventId = await core.dataModel
          // @ts-ignore
          .createTile("Event", event)
          .then((doc) => doc.id.toString());
      }

      await addToCalendar(eventId, selfID);

      queryClient.setQueryData(["events"], (data: Event[] = []) =>
        data.concat({ id: eventId, ...event })
      );

      return eventId;
    } catch (error) {
      console.log("Error creating event", error);
    }
  });
}

export function useAddToCalendar() {
  const [{ selfID }]: any = useViewerConnection();
  const client = useQueryClient();
  return useMutation(async (eventId) => {
    console.log("Add event to calendar", eventId);

    return addToCalendar(eventId, selfID).then(() =>
      client.invalidateQueries("calendar")
    );
  });
}
export function useRemoveFromCalendar() {
  const [{ selfID }]: any = useViewerConnection();
  const client = useQueryClient();
  return useMutation(async (eventId) => {
    console.log("Remove event from calendar", eventId);
    return removeFromCalendar(eventId, selfID).then(() =>
      client.invalidateQueries("calendar")
    );
  });
}

export function useCalendar() {
  const [{ selfID }]: any = useViewerConnection();
  return useQuery(["calendar"], () => {
    return getCalendar(selfID);
  });
}

export function useUpdateEvent() {
  const { ceramic } = useCore();
  return useMutation(async (event: Event) => {
    console.log("Update event", event);

    // TODO: handle encrypted
    return TileDocument.load<Event>(ceramic, event.id).then(
      (doc) => doc && doc.update({ ...doc.content, ...event })
    );
  });
}

export function useEvents() {
  const [{ selfID }]: any = useViewerConnection();
  return useQuery<Event[], Error>(
    ["events"],
    async ({}) => {
      console.log("Loading events...");
      const events = await getCalendar(selfID);
      return Promise.all(
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

async function prepareEvent(event, selfID) {
  console.log("Preparing event...");
  return {
    ...event,
    organizer: selfID.id,
    // attendees: await Promise.all(
    //   event.attendees.map((addr) => addressToDid(addr, selfID.client.ceramic))
    // ),
    start: event.start.toISOString(),
    end: event.end?.toISOString(),
  };
}

async function getCalendar(selfID) {
  console.log("Getting calendar");
  const events = await selfID.get("events");
  if (!events) {
    console.log("No events in calendar, creating empty list");
    await selfID.set("events", { events: [] });
  }
  return events?.events || [];
}

async function addToCalendar(eventId, selfID) {
  const events = await getCalendar(selfID);

  if (events.includes(eventId)) {
    console.log("Event already exists in calendar", events);
  }

  return selfID.set("events", { events: [...events, eventId] });

  // const calendars = await selfID.get("calendars");
  // calendars[calendarId].events.push(eventId);
  // return selfID.set("calendars", { calendars });
}
async function removeFromCalendar(eventId, selfID) {
  const events = await getCalendar(selfID);

  if (events.includes(eventId)) {
    console.log("Event already exists in calendar", events);
    return selfID.set("events", {
      events: events.filter((id) => id !== eventId),
    });
  }
}

async function loadTile(ceramic, id) {
  return TileDocument.load(ceramic, id)
    .then(async (doc) => {
      // Check if content encrypted
      return doc.content.accessControlConditions
        ? await createLit()
            .then((lit) => lit.readAndDecrypt(id))
            .catch((err) => {
              console.log("LIT", err);
              return null
            })
            .then(JSON.parse)
        : doc;
    })
    .then((doc) => ({ ...doc, id }));
}

function addDocId(doc) {
  console.log("addDocId", doc, doc.accessControlConditions);
  return { id: doc.id.toString(), ...doc.content };
}
