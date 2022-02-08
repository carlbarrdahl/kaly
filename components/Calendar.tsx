import {
  Calendar,
  dateFnsLocalizer,
  Views,
  Navigate,
  EventWrapperProps,
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { Box } from "@chakra-ui/react";
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

type Event = any;
type IProps = {
  events: Event[];
  shortcutsEnabled: boolean;
  onSelectEvent: (event: Event) => void;
  onNewEvent: (event: Event) => void;
};
const BigCalendar: React.FC<IProps> = ({
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
        components={{
          eventWrapper: (p: any) => {
            // console.log(p);
            return (
              <Box
                p="1"
                fontSize="sm"
                color="white"
                bg="blue.500"
                cursor="pointer"
                onClick={() => p.onSelect(p.event)}
                // {...p}
                _hover={{
                  bg: "blue.600",
                }}
              >
                <Box
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {p.event.title}
                </Box>
              </Box>
            );
          },
        }}
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
