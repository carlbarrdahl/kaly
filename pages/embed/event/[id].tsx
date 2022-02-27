import { Box, HStack, Button, Text, Icon, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  useEvent,
  useAddToCalendar,
  useCalendar,
  useRemoveFromCalendar,
} from "../../../hooks/events";

import type { Event } from "../../../schemas/event";

import { FiCalendar, FiCheck } from "react-icons/fi";
import { format } from "date-fns";
import { rrulestr } from "rrule";
import Markdown from "../../../components/MarkdownEditor";
import LayoutEmbed from "../../../components/LayoutEmbed";

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

const EventEmbed: NextPage = () => {
  const router = useRouter();

  const { data, isLoading, error } = useEvent(router.query.id);

  if (!data) {
    return <Button>No event found</Button>;
  }
  return (
    <LayoutEmbed>
      <EventCard {...data} />
    </LayoutEmbed>
  );
};

export default EventEmbed;
