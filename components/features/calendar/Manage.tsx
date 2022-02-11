import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Heading,
  HStack,
  VStack,
  StackDivider,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const Manage = ({}) => {
  return (
    <Box maxW="300">
      <Text fontSize="sm" pl={4} mb={2} color="gray.700">
        Calendars
      </Text>
      <Accordion defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton py={1}>
            <Checkbox colorScheme="green" defaultIsChecked w={"100%"}>
              <Text fontSize="sm">Private</Text>
            </Checkbox>
          </AccordionButton>
          <AccordionButton py={1}>
            <Checkbox colorScheme="blue" defaultChecked w={"100%"}>
              <Text fontSize="sm">Public</Text>
            </Checkbox>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Manage;
