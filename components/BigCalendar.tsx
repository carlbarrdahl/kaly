import {
  Calendar,
  dateFnsLocalizer,
  Views,
  Navigate,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import { useMemo, useRef } from "react";
import { useKeyPressEvent } from "react-use";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

function useShortcuts(ref, enabled) {
  const { handleViewChange, handleNavigate } = ref.current || {};
  useKeyPressEvent("1", () => enabled && handleViewChange(Views.MONTH));
  useKeyPressEvent("2", () => enabled && handleViewChange(Views.WEEK));
  useKeyPressEvent("3", () => enabled && handleViewChange(Views.DAY));
  useKeyPressEvent("4", () => enabled && handleViewChange(Views.AGENDA));
  useKeyPressEvent("r", () => enabled && handleNavigate(Navigate.PREVIOUS));
  useKeyPressEvent("t", () => enabled && handleNavigate(Navigate.TODAY));
  useKeyPressEvent("y", () => enabled && handleNavigate(Navigate.NEXT));
}

const BigCalendar = ({
  events = [],
  shortcutsEnabled,
  onSelectEvent,
  onNewEvent,
}) => {
  const ref = useRef(null);

  useShortcuts(ref, shortcutsEnabled);

  // Calendar expects Date, not strings
  const parsedEvents = useMemo(
    () =>
      events.map((e) => ({
        ...e,
        start: new Date(e.start),
        end: new Date(e.end),
      })),
    [events]
  );
  return (
    <div>
      <Calendar
        ref={ref}
        selectable
        onNavigate={(e) => console.log("nav", e)}
        localizer={localizer}
        events={parsedEvents}
        components={
          {
            // event: () => <pre>event</pre>,
            // eventWrapper: (p) => {
            //   console.log(p);
            //   return <pre>{p.event}</pre>;
            // },
          }
        }
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        onSelectSlot={onNewEvent}
        style={{ height: "calc(100vh - 90px)" }}
      />
    </div>
  );
};

export default BigCalendar;
