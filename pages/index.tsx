import type { NextPage } from "next";
import { useState } from "react";
import { Box } from "@chakra-ui/react";

import Calendar from "../components/features/calendar/Calendar";
import NewEventModal from "../components/NewEventModal";
import { useCreateEvent, useEvents } from "../hooks/events";
import { useRouter } from "next/router";

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

  function handleSelectEvent(e) {
    router.push(`/event/${e.event.id}`);
  }

  console.log("events", data);
  console.log(newEvent);
  return (
    <Box>
      <Calendar
        // @ts-ignore
        events={data}
        shortcutsEnabled={!newEvent}
        onSelectEvent={handleSelectEvent}
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
