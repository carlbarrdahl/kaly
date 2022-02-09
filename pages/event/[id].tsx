import {
  Box,
  Input,
  Flex,
  Skeleton,
  HStack,
  Button,
  Text,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListIcon,
  Textarea,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { DateTimeInput } from "../../components/NewEventModal";
import { useEvent, useUpdateEvent } from "../../hooks/events";
import Avatar from "boring-avatars";
import Editor from "../../components/MarkdownEditor";
import { truncate } from "../../utils/format";
import { useViewerConnection } from "@self.id/react";

const EventDetails = ({ event, isOwner, isLoading, isUpdating, onUpdate }) => {
  console.log("EventDetails", event);
  const { register, getValues, handleSubmit } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      ...event,
    },
  });

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <Flex flex="1 1 auto" bg="white" height="100%" flexWrap="wrap">
        <Box flex="0.5 0 300px" mr={[0, 0, 16]}>
          <Skeleton isLoaded={!isLoading}>
            <Flex mb={4}>
              <Input
                readOnly={isOwner}
                variant="flushed"
                defaultValue={event?.title}
                fontSize="2xl"
              />
              {isOwner ? (
                <Button
                  px={7}
                  isLoading={isUpdating}
                  type="submit"
                  ml={4}
                  colorScheme={"blue"}
                >
                  Save
                </Button>
              ) : (
                <Button
                  px={7}
                  isLoading={isUpdating}
                  type="submit"
                  ml={4}
                  colorScheme={"blue"}
                >
                  Join
                </Button>
              )}
            </Flex>
          </Skeleton>
          <HStack mt={2}>
            <Skeleton isLoaded={!isLoading}>
              <DateTimeInput
                required
                id="start"
                value={getValues("start")}
                {...register("start", { valueAsDate: false })}
              />
            </Skeleton>
            {event.end ? (
              <Skeleton isLoaded={!isLoading}>
                <DateTimeInput
                  required
                  id="end"
                  value={getValues("end")}
                  {...register("end", { valueAsDate: false })}
                />
              </Skeleton>
            ) : null}
          </HStack>
          <Box mt={4}>
            <Skeleton isLoaded={!isLoading}>
              {isOwner ? (
                <Textarea rows={10} {...register("description")} />
              ) : (
                <Editor content={event?.description} />
              )}
            </Skeleton>
          </Box>
        </Box>
        <Box flex="0 0 200px">
          <FormControl mt={2}>
            <List spacing={3}>
              <FormLabel htmlFor="attendees">
                {event?.attendees?.length} attendees
              </FormLabel>
              {event?.attendees?.map((attendee) => (
                <ListItem key={attendee} as={Flex} alignItems="center">
                  <ListIcon as={() => <Avatar name={attendee} size={24} />} />
                  <Text fontSize="sm" ml={2}>
                    {truncate(attendee)}
                  </Text>
                </ListItem>
              ))}
            </List>
          </FormControl>
        </Box>
      </Flex>
    </form>
  );
};

const EventPage: NextPage = () => {
  const router = useRouter();
  const [{ selfID }]: any = useViewerConnection();

  const { data, isLoading, error } = useEvent(router.query.id);
  const updateEvent = useUpdateEvent();

  const isOwner = selfID?.id === data?.organizer;
  if (!data) {
    return <Box>loading...</Box>;
  }
  return (
    <EventDetails
      event={data}
      isLoading={isLoading}
      isUpdating={updateEvent.isLoading}
      isOwner={isOwner}
      onUpdate={(updatedEvent) => {
        console.log("updated", updatedEvent);
        updateEvent.mutate(updatedEvent, {
          onSuccess: (res) => {
            console.log("Event updated", res);
          },
        });
      }}
    />
  );
};

export default EventPage;
