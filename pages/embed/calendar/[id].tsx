import { Box, HStack, Button, Text, Icon, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  useEvent,
  useAddToCalendar,
  useCalendar,
  useRemoveFromCalendar,
  useEvents,
} from "../../../hooks/events";

import type { Event } from "../../../schemas/event";

import { FiCalendar, FiCheck } from "react-icons/fi";
import { format } from "date-fns";
import { rrulestr } from "rrule";
import Markdown from "../../../components/MarkdownEditor";
import LayoutEmbed from "../../../components/LayoutEmbed";
import CalendarMinimal from "../../../components/features/calendar/CalendarMinimal";

const AddToCalendarButton = ({ event }) => {
  const add = useAddToCalendar();
  const remove = useRemoveFromCalendar();
  const { data = [] } = useCalendar();
  console.log(data);
  const isAdded = data.includes(event.id);

  return false /* isSuccess */ ? (
    <Button isFullWidth>
      <Icon as={FiCheck} mr={2} />
      Event added
    </Button>
  ) : (
    <Button
      isFullWidth
      isLoading={add.isLoading || remove.isLoading}
      colorScheme={isAdded ? "gray" : "blue"}
      onClick={() => (isAdded ? remove.mutate(event.id) : add.mutate(event.id))}
    >
      <Icon as={FiCalendar} mr={2} />{" "}
      {isAdded ? "Remove from calendar" : "Add to calendar"}
    </Button>
  );
};

const EventCard: React.FunctionComponent<Event> = ({
  id,
  start,
  end,
  title,
  description = "",
  rrule = "",
}) => {
  return (
    <Box maxW={"xs"}>
      <HStack divider={<Text px={1}>⋅</Text>}>
        <Text fontSize={"xs"}>
          {format(new Date(start), "EEE dd MMM yyyy")}
        </Text>
        <Text fontSize="xs">
          {format(new Date(start), "HH:mm")} -{" "}
          {end ? format(new Date(end), "HH:mm") : ""}{" "}
        </Text>
      </HStack>
      <Heading fontSize={"xl"}>{title}</Heading>
      {rrule ? (
        <Text mb={2} fontSize="xs">
          Repeats: {rrulestr(rrule).toText()}
        </Text>
      ) : null}
      <Box mb={3} fontSize="sm" maxH="100px" overflowY={"scroll"}>
        <Markdown content={description} />
      </Box>
      <AddToCalendarButton event={{ id }} />
    </Box>
  );
};

const getView = (type = "day") =>
  ({
    day: "timeGridDay",
    week: "timeGridWeek",
    month: "dayGridMonth",
    agenda: "listWeek",
  }[type]);

const CalendarEmbed: NextPage = () => {
  const router = useRouter();
  console.log(router);
  // TODO: Fix hook to fetch calendar without signed in
  //   const { data, isLoading, error } = useEvents(router.query.id);

  //   if (!data) {
  //     return <Button>No event found</Button>;
  //   }
  const view = getView(router?.query?.view as string);
  const date = router.query.date || format(new Date(), "yyyy-MM-dd");
  console.log(view, router.query.view);
  return router.isReady ? (
    <Box>
      <CalendarMinimal
        events={[
          {
            // @ts-ignore
            title: "Test",
            // @ts-ignore
            start: new Date().toISOString(),
          },
        ]}
        view={view}
        date={date}
      />
    </Box>
  ) : (
    <div></div>
  );
};

export default CalendarEmbed;
