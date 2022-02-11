import { extendTheme } from "@chakra-ui/react";
import defaultTheme from "@chakra-ui/theme";
import { CalendarDefaultTheme } from "@uselessdev/datepicker";

const colors = {
  ...defaultTheme.colors,
  blue: {
    "50": "#E5F1FF",
    "100": "#B8D7FF",
    "200": "#8ABDFF",
    "300": "#5CA3FF",
    "400": "#2E89FF",
    "500": "#006FFF",
    "600": "#0059CC",
    "700": "#004399",
    "800": "#002C66",
    "900": "#001633",
  },
};
const fullCalendarStyles = {
  ".fc .fc-button-primary": {
    bg: "none",
    color: colors.gray["800"],
    // bg: colors.blue["500"],
    borderWidth: 0,
    borderRadius: 1,
    "&:hover": {
      bg: colors.blue["500"],
    },
  },
  ".fc .fc-button-primary:disabled": {
    bg: "none",
    color: colors.gray["600"],
    // bg: colors.gray["400"],
  },
  ".fc .fc-button-primary:not(:disabled).fc-button-active": {
    bg: colors.blue["500"],
    "&:hover": {
      bg: colors.blue["600"],
    },
    //
  },
  ".fc .fc-timegrid-now-indicator-arrow": {
    borderColor: colors.red["500"],
    borderRadius: "100%",
    borderWidth: 5,
  },
  ".fc .fc-timegrid-now-indicator-line": {
    borderColor: colors.red["500"],
  },
  ".fc-timegrid-event-harness-inset .fc-timegrid-event": {
    boxShadow: "none",
  },
  ".fc-day-today, .fc .fc-daygrid-day.fc-day-today, .fc .fc-timegrid-col.fc-day-today":
    {
      bg: "none",
    },
  ".fc-day-today, .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number": {
    // bg: colors.blue["500"],
    // borderRadius: "100%",
    // color: "white",
    // fontWeight: "bold",
  },
};

export const theme = extendTheme(CalendarDefaultTheme, {
  colors,
  styles: { global: fullCalendarStyles },
  borders: {
    borderRadius: 0,
  },
  components: {
    Button: {
      defaultProps: {
        px: 7,
      },
      baseStyle: {
        px: 7,
        rounded: "sm",
      },
    },
  },
});
