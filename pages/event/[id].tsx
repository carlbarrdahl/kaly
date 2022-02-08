import {
  Box,
  Heading,
  Input,
  Flex,
  Skeleton,
  SkeletonText,
  HStack,
  SimpleGrid,
  Text,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CreatableSelect } from "chakra-react-select";
import { DateTimeInput } from "../../components/NewEventModal";
import { useEvent } from "../../hooks/events";
import Avatar from "boring-avatars";
import Editor from "../../components/MarkdownEditor";
import { truncate } from "../../utils/format";

const EventPage: NextPage = () => {
  const router = useRouter();
  const { data, isLoading, error } = useEvent(router.query.id);

  console.log("data", data);
  if (isLoading) {
    return "...";
  }
  return (
    <Flex flex="1 1 auto" bg="white" height="100%" flexWrap="wrap">
      <Box flex="0.5 0 300px" mr={[0, 0, 16]}>
        <Editable defaultValue={data.title} fontSize="2xl">
          <EditablePreview />
          <EditableInput />
        </Editable>
        <HStack mt={2}>
          <DateTimeInput
            // readOnly
            size="xs"
            // border="none"
            value={new Date(data.start)}
          />
          <DateTimeInput
            // readOnly
            size="xs"
            // border="none"
            value={new Date(data.end)}
          />
        </HStack>
        <Editor content={data.description} />
      </Box>
      <Box flex="0 0 200px">
        <FormControl mt={2}>
          <List spacing={3}>
            <FormLabel htmlFor="attendees">
              {data.attendees.length} attendees
            </FormLabel>
            {data.attendees.map((attendee) => (
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
