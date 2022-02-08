import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { format } from "date-fns";
import Link from "./Link";

const EventModal = ({ event, onClose }) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={!!event}
      onClose={onClose}
      size="2xl"
    >
      {/* <ModalOverlay /> */}
      <ModalContent shadow="2xl">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box>{/* <Icon /> */}</Box>
            <Box>
              <Heading fontSize="2xl">{event?.title}</Heading>
              <Text>
                {format(event?.start, "PPp")} - {format(event?.end, "PPp")}
              </Text>
            </Box>
          </Flex>

          {JSON.stringify(event, null, 2)}
        </ModalBody>
        <ModalFooter>
          <Link href={`/event/${event?.id}`}>
            <Button>Event details</Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default EventModal;
