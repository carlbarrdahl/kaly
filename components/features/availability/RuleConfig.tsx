import {
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
} from "@chakra-ui/react";
import { addDays, format, startOfWeek } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Availability, availabilitySchema } from "../../../schemas/event";
import IntervalsConfig from "./IntervalsConfig";

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

const RuleConfig = ({ onUpdate }) => {
  const { control, register, handleSubmit, formState } = useForm<Availability>({
    defaultValues: defaultAvailability,
    resolver: zodResolver(availabilitySchema),
  });

  console.log(formState.errors);
  const rules = useFieldArray({ control, name: `rules` });

  const insertRule = useCallback(
    (i, day) => rules.insert(i, createDefaultInterval(day)),
    []
  );
  const removeRule = useCallback((i) => rules.remove(i), []);

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
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
        <Button type="submit">Save</Button>
      </VStack>
    </form>
  );
};

export default RuleConfig;
