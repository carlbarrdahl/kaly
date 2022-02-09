import {
  Calendar as BigCalendar,
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
import { Event } from "../schemas/event";

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

type IProps = {
  events: Event[] | undefined;
  shortcutsEnabled: boolean;
  onSelectEvent: any; // (event: Event) => void;
  onNewEvent: any; // (event: Event) => void;
};
const Calendar: React.FC<IProps> = ({
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
        end: e.end ? new Date(e.end) : undefined,
      })),
    [events]
  );

  return (
    <div>
      <BigCalendar
        ref={ref}
        selectable
        onNavigate={(e) => console.log("nav", e)}
        localizer={localizer}
        events={parsedEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        onSelectSlot={onNewEvent}
        style={{ height: "calc(100vh - 90px)" }}
      />
    </div>
  );
};

export default Calendar;
