import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import rrulePlugin from "@fullcalendar/rrule";

import { useRef } from "react";
import { theme } from "../../../theme";

const Calendar = ({ events = [], view }) => {
  const ref = useRef();

  console.log("view", events, view);
  return (
    <FullCalendar
      // @ts-ignore
      ref={ref}
      plugins={[
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        listPlugin,
        rrulePlugin,
      ]}
      selectable
      headerToolbar={false}
      initialView={view}
      dayMaxEvents={true}
      events={events}
      eventColor={theme.colors.blue["500"]}
    />
  );
};

export default Calendar;
