import { useCore, useViewerRecord } from "@self.id/react";
import type { NextPage } from "next";
import Head from "next/head";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import { useState } from "react";
// import Calendar from "../components/Calendar";
import BigCalendar from "../components/BigCalendar";
import NewEventModal from "../components/NewEventModal";
import EventModal from "../components/EventModal";
import Profile from "../components/Profile";
import ConnectButton from "../components/ConnectButton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCreateEvent, useEvents } from "../hooks/events";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

const events = [
  {
    title: "Yoga class",
    attendees: ["<eth_address>"],
    start: [2022, 1, 4, 18],
    duration: { hours: 1 },
  },
  { title: "event 2", start: "2022-02-04 16:15" },
];

const Home: NextPage = () => {
  const core = useCore();
  const router = useRouter();
  console.log("core", core);
  const createEvent = useCreateEvent();
  const { data, isLoading, error } = useEvents();

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState(null);

  function handleCreateEvent(event) {
    if (!event) return setNewEvent(null);
    createEvent.mutate(event, {
      onSuccess: (res) => {
        setNewEvent(null);
        console.log("Event created", res);
      },
    });
  }

  console.log("New event", newEvent);
  return (
    <Box bg="white">
      <BigCalendar
        events={data}
        shortcutsEnabled={!newEvent}
        onSelectEvent={(event) => {
          console.log(event);
          router.push(`/event/${event.id}`);
        }}
        // onSelectEvent={setSelectedEvent}
        onNewEvent={setNewEvent}
      />
      {/* {selectedEvent ? (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      ) : null} */}
      {newEvent ? (
        <NewEventModal
          event={newEvent}
          isLoading={createEvent.isLoading}
          isOpen={!!newEvent}
          onClose={handleCreateEvent}
        />
      ) : null}
    </Box>
  );
};

// {/* <Calendar events={data} onCreateEvent={handleCreateEvent} /> */}
export default Home;
