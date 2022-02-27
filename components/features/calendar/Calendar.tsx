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
      //   events={[
      //     {
      //       id: "kjzl6cwe1jw148h72qxs6l5ljjr489hs5px4vjpcu6b3pmkti57parj8o84h61h",
      //       end: "2022-02-08T18:00:00.000Z",
      //       url: "",
      //       start: new Date(),
      //       title: "Yoga",
      //       allDay: false,
      //       attendees: [],
      //       organizer:
      //         "did:3:kjzl6cwe1jw1486v4vaq4amvob4cy7ix3hp7q9hfkkq1at57kdc2ivnw0cz8sja",
      //       description: "yoga session",
      //       color: theme.colors.purple["400"],
      //       rrule: {
      //         // rrule strings also work
      //         freq: "daily",
      //         interval: 1,
      //         byweekday: ["mo", "we", "fr"],
      //         dtstart: "2012-02-01T10:30:00", // will also accept '20120201T103000'
      //         // until: "2012-06-01", // will also accept '20120201'
      //       },
      //     },

      //     {
      //       id: "kjzl6cwe1jw147x36zvr8unoa7edzh3opguckrnvwnce79b0lkwxbr92gdoc6yi",
      //       end: "2022-02-09T10:00:00.000Z",
      //       url: "",
      //       start: "2022-02-09T09:00:00.000Z",
      //       title: "60 min feedback",
      //       allDay: false,
      //       attendees: ["0x6A4E948a81E20802C91bB48D825A741a6F1E9062"],
      //       organizer:
      //         "did:3:kjzl6cwe1jw1486v4vaq4amvob4cy7ix3hp7q9hfkkq1at57kdc2ivnw0cz8sja",
      //       description:
      //         "# Feedback session\n\nMore info: https://github.com/carlbarrdahl/kaly\n\n## What is it?\nA decentralized calendar and scheduling app built with Ceramic.\n\n## How does it work?\n1. Sign in with Metamask\n2. Create an event\n3. Share link\n\n## Why?\n- DAOs can pull in events from their members\n- Composable calendars\n- For fun!",
      //     },
      //   ]}
      //   events={{
      //     url: "./ical.ics",
      //     format: "ics",
      //   }}
    />
  );
};

export default Calendar;
