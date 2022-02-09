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
  SimpleGrid,
  Kbd,
  Flex,
  VStack,
  Link,
  StackDivider,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import Markdown from "./MarkdownEditor";

const shortcuts = [
  {
    description: "Month view",
    component: <Kbd>1</Kbd>,
  },
  {
    description: "Week view",
    component: <Kbd>2</Kbd>,
  },
  {
    description: "Day view",
    component: <Kbd>3</Kbd>,
  },
  {
    description: "Agenda view",
    component: <Kbd>4</Kbd>,
  },
  {
    description: "Previous month / week / day (depends on view)",
    component: <Kbd>r</Kbd>,
  },
  {
    description: "Go to today",
    component: <Kbd>t</Kbd>,
  },
  {
    description: "Next month / week / day (depends on view) view",
    component: <Kbd>y</Kbd>,
  },
];
const HelpModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent shadow="2xl">
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid row={1} columns={2} spacing={6}>
            <Box>
              <Heading fontSize="lg" mb={4}>
                What is Kaly?
              </Heading>
              <Markdown
                content={`Kaly is a Web3 calendar / scheduling app. All the events are
stored in your Self.id account and can be accessed from other apps.
              
Go to https://github.com/carlbarrdahl/kaly for more information
              `}
              />
            </Box>
            <Box>
              <Heading fontSize="lg" mb={4}>
                Keyboard shortcuts
              </Heading>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {shortcuts.map((shortcut, i) => (
                  <Flex key={i} justifyContent="space-between">
                    <Box>{shortcut.description}</Box>
                    <Box fontSize="lg">{shortcut.component}</Box>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </SimpleGrid>
          <ModalFooter> </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default HelpModal;
