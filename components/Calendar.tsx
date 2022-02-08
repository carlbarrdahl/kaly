import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import styled from "@emotion/styled";
import { Button } from "@chakra-ui/button";
import NewEventModal from "./NewEventModal";
import { useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/hooks";

export const StyleWrapper = styled.div`
  max-height: calc(100vh - 200px);
`;

const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const Calendar = ({ events = [], onCreateEvent }) => {
  const initialRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSaveEvent(event) {
    if (event) {
      onCreateEvent(event);
      //   setEvents((s) => s.concat(event));
    }
    onClose();
  }

  function handleSelect(e) {
    console.log("select", e);
    setSelectedEvent(e);
    onOpen();
  }
  function handleEventClick(e) {
    console.log("event click", e);
  }
  function handleEventResize(e) {
    console.log("event resize", e);
  }

  function handleEventDrop(e) {
    console.log("drop event", e.event.toJSON());
    // updateEvent().catch(() => e.revert())
  }

  return (
    <StyleWrapper>
      <FullCalendar
        height="100%"
        timeZone={"UTC"}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          iCalendarPlugin,
        ]}
        nowIndicator
        editable
        selectable
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        height="100vh"
        select={handleSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        events={events}
        //   events={{
        //     url: "./ical.ics",
        //     format: "ics",
        //   }}
      />
      <FullCalendar
        plugins={[listPlugin]}
        events={events}
        initialView="dayGridMonth"
      />
      <NewEventModal
        selectedEvent={selectedEvent}
        isOpen={isOpen}
        onClose={handleSaveEvent}
        initialRef={initialRef}
      />
    </StyleWrapper>
  );
};

export default Calendar;
