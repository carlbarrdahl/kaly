import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Icon,
  Heading,
  Alert,
  Spinner,
} from "@chakra-ui/react";
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
import { addMinutes, format } from "date-fns";
import { rrulestr } from "rrule";
import Markdown from "../../../components/MarkdownEditor";
import LayoutEmbed from "../../../components/LayoutEmbed";

const AddToCalendarButton = ({ event }) => {
  const add = useAddToCalendar();
  const remove = useRemoveFromCalendar();
  const { data = [] } = useCalendar();
  const isAdded = data.includes(event.id);

  return (
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

const toDuration = (duration, start) =>
  format(addMinutes(start, +duration.slice(1, duration.length - 1)), "HH:mm");

const EventCard: React.FunctionComponent<Event> = ({
  id,
  start = new Date(),
  end,
  duration,
  title,
  description = "",
  rrule = "",
}) => {
  const startDate = new Date(start);
  return (
    <>
      <HStack divider={<Text px={1}>⋅</Text>}>
        <Text fontSize={"xs"}>{format(startDate, "EEE dd MMM yyyy")}</Text>
        <Text fontSize="xs">
          {format(startDate, "HH:mm")} -{" "}
          {duration
            ? toDuration(duration, startDate)
            : end
            ? format(new Date(end), "HH:mm")
            : ""}{" "}
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
    </>
  );
};

const EventEmbed: NextPage = () => {
  const router = useRouter();

  const { data = {}, isLoading, error } = useEvent(router.query.id);

  return (
    <LayoutEmbed isLoading={isLoading} error={error}>
      {/* @ts-ignore */}
      <EventCard {...data} />
    </LayoutEmbed>
  );
};

export default EventEmbed;
