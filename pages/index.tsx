import type { NextPage } from "next";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

import Calendar from "../components/Calendar";
import NewEventModal from "../components/NewEventModal";
import EventModal from "../components/EventModal";
import { useCreateEvent, useEvents } from "../hooks/events";
import { useRouter } from "next/router";
import { Event } from "../schemas/event";

const Home: NextPage = () => {
  const router = useRouter();
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

  return (
    <Box>
      <Calendar
        events={data}
        shortcutsEnabled={!newEvent}
        onSelectEvent={(event) => router.push(`/event/${event.id}`)}
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
