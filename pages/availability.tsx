import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Input,
  Heading,
  HStack,
  VStack,
  StackDivider,
  Text,
  Icon,
  IconButton,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { addDays, format, startOfWeek } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { useCallback } from "react";

const IntervalsConfig = ({ index, control, register, onRemove }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `rules.${index}.intervals`,
  });

  return (
    <>
      <Box>
        {fields.map((interval, i) => {
          return (
            <Box key={interval.wday} mb={2}>
              <Flex>
                <FormControl ml="8" flex={"0"}>
                  <HStack divider={<Text px={2}>-</Text>}>
                    <Input
                      autoFocus
                      required
                      {...register(`rules[${index}].intervals[${i}].from`, {
                        required: true,
                      })}
                      width="24"
                      pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}"
                    />
                    <Input
                      required
                      {...register(`rules[${index}].intervals[${i}].to`, {
                        required: true,
                      })}
                      width="24"
                      pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}"
                    />
                  </HStack>
                </FormControl>
                <Flex alignItems="center">
                  <IconButton
                    fontSize="xl"
                    ml="4"
                    variant="ghost"
                    aria-label="Delete interval"
                    onClick={() => (fields.length > 1 ? remove(i) : onRemove())}
                    icon={<FiTrash2 />}
                  />
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </Box>
      <Flex justifyContent="flex-end" flex="1">
        <IconButton
          fontSize="xl"
          ml="4"
          mr="4"
          variant="ghost"
          aria-label="Add interval"
          icon={<FiPlus />}
          onClick={() => append({})}
        />
      </Flex>
    </>
  );
};

const formattedAddDay = (i, type) =>
  format(addDays(startOfWeek(new Date()), i), type);

const days = Array.from(Array(7)).map((e, i) => ({
  name: formattedAddDay(i, "EEEE").toLowerCase(),
  label: formattedAddDay(i, "EEE"),
}));

const createDefaultInterval = (day) => ({
  type: "wday",
  intervals: [{ from: "09:00", to: "17:00" }],
  wday: day.name,
});

const defaultAvailability = {
  rules: [
    {
      type: "wday",
      intervals: [{ from: "09:00", to: "17:00" }],
      wday: "monday",
    },
  ],
};
const AvailabilityConfig = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: defaultAvailability,
  });
  const rules = useFieldArray({ control, name: `rules` });

  const updateAvailability = (data) => console.log(data);

  const insertRule = useCallback(
    (i, day) => rules.insert(i, createDefaultInterval(day)),
    []
  );
  const removeRule = useCallback((i) => rules.remove(i), []);

  return (
    <form onSubmit={handleSubmit(updateAvailability)}>
      <Heading fontSize="sm">Weekly hours</Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {days.map((day, i) => {
          const ruleIndex = rules.fields.findIndex((r) => r.wday === day.name);
          const rule = rules.fields[ruleIndex];

          return (
            <Flex key={day.name}>
              <FormControl as={Flex} width={"80px"}>
                <HStack spacing={0}>
                  <Checkbox
                    id={`day.${i}.value`}
                    p={2}
                    aria-label="Toggle rule"
                    isChecked={!!rule}
                    onChange={(e) =>
                      e.target.checked
                        ? insertRule(i, day)
                        : removeRule(ruleIndex)
                    }
                  />
                  <FormLabel
                    p={4}
                    htmlFor={`day.${i}.value`}
                    textTransform="uppercase"
                    fontSize="sm"
                    cursor="pointer"
                  >
                    {day.label}
                  </FormLabel>
                </HStack>
              </FormControl>
              {rule ? (
                <IntervalsConfig
                  index={ruleIndex}
                  {...{ control, register }}
                  onRemove={() => removeRule(ruleIndex)}
                />
              ) : (
                <Flex as={Text} alignItems="center" ml={8} color="gray.500">
                  Unavailable
                </Flex>
              )}
            </Flex>
          );
        })}
        <Button type="form" colorScheme="blue">
          Save
        </Button>
      </VStack>
    </form>
  );
};
const Availability: NextPage = () => {
  return (
    <Box>
      <SimpleGrid
        templateColumns={["none", "none", "none", "2fr 1fr"]}
        spacing="8"
      >
        <Box>
          <AvailabilityConfig />
        </Box>
        <Box borderLeft="1px solid #eee" pl={8}>
          <Heading fontSize="sm">Date overrides</Heading>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Availability;
