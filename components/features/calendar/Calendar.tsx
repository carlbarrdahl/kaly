import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";

import { useRef, useState } from "react";
import { theme } from "../../../theme";
import { useKeyPressEvent } from "react-use";

function useShortcuts(ref, enabled) {
  const api = enabled && ref?.current?.getApi();

  useKeyPressEvent("1", () => api && api.changeView("dayGridMonth"));
  useKeyPressEvent("2", () => api && api.changeView("timeGridWeek"));
  useKeyPressEvent("3", () => api && api.changeView("timeGridDay"));
  useKeyPressEvent("4", () => api && api.changeView("listWeek"));
  useKeyPressEvent("r", () => api && api.next());
  useKeyPressEvent("t", () => api && api.today());
  useKeyPressEvent("y", () => api && api.prev());
}

const Calendar = ({
  events = [],
  shortcutsEnabled,
  onSelectEvent,
  onNewEvent,
}) => {
  const ref = useRef();

  useShortcuts(ref, shortcutsEnabled);

  console.log("Calendar events", events);
  return (
    <FullCalendar
      // @ts-ignore
      ref={ref}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "Agenda",
      }}
      height="calc(100vh - 200px)"
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
        rrulePlugin,
      ]}
      nowIndicator
      allDaySlot={false}
      editable
      selectable
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay, listWeek",
      }}
      initialView="timeGridWeek"
      dayMaxEvents={true}
      select={onNewEvent}
      eventClick={onSelectEvent}
      // eventDrop={handleEventDrop}
      // eventResize={handleEventResize}
      events={events}
      eventColor={theme.colors.blue["500"]}
    />
  );
};

export default Calendar;
