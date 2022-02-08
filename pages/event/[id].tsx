import {
  Box,
  Input,
  Flex,
  Skeleton,
  HStack,
  Text,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { DateTimeInput } from "../../components/NewEventModal";
import { useEvent } from "../../hooks/events";
import Avatar from "boring-avatars";
import Editor from "../../components/MarkdownEditor";
import { truncate } from "../../utils/format";

const EventPage: NextPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useEvent(router.query.id);

  return (
    <Flex flex="1 1 auto" bg="white" height="100%" flexWrap="wrap">
      <Box flex="0.5 0 300px" mr={[0, 0, 16]}>
        <Skeleton isLoaded={!isLoading}>
          <Input variant="flushed" defaultValue={data?.title} fontSize="2xl" />
        </Skeleton>
        <HStack mt={2}>
          <Skeleton isLoaded={!isLoading}>
            <DateTimeInput
              // readOnly
              size="sm"
              // border="none"
              value={data?.start && new Date(data.start)}
            />
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <DateTimeInput
              // readOnly
              size="sm"
              // border="none"
              value={data?.end && new Date(data.end)}
            />
          </Skeleton>
        </HStack>
        <Box mt={4}>
          <Skeleton isLoaded={!isLoading}>
            <Editor content={data?.description} />
          </Skeleton>
        </Box>
      </Box>
      <Box flex="0 0 200px">
        <FormControl mt={2}>
          <List spacing={3}>
            <FormLabel htmlFor="attendees">
              {data?.attendees?.length} attendees
            </FormLabel>
            {data?.attendees?.map((attendee) => (
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
  );
};

export default EventPage;
