import {
  Box,
  HStack,
  Text,
  Input,
  Checkbox,
  Select,
  FormLabel,
  FormControl,
  InputGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RRule } from "rrule";
import { useEffect, useState } from "react";
import DateSelector from "../../DateSelector";

const labels = {
  [RRule.DAILY]: { interval: "day(s)" },
  [RRule.WEEKLY]: { interval: "week(s)" },
  [RRule.MONTHLY]: { interval: "month(s)" },
  [RRule.YEARLY]: { interval: "" },
};

const RecurrencySetting: React.FC<{
  start: any;
  onChange(rrule: string): void;
}> = ({ start, onChange = () => {} }) => {
  const [endType, setEndType] = useState("0");
  const [isActive, toggleActive] = useState(false);
  const { register, watch, handleSubmit, getValues, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: [],
      dtstart: start,
      until: new Date(),
      ends: 0,
      count: 1,
    },
  });
  const formData = watch();
  useEffect(() => {
    try {
      const { ends, ...form } = formData;
      if (ends === 0) {
        // @ts-ignore
        delete form.until;
        // @ts-ignore
        delete form.count;
      }
      if (ends === 1) {
        // @ts-ignore
        delete form.count;
      }
      if (ends === 2) {
        // @ts-ignore
        delete form.until;
      }
      const rruleStr = new RRule(form).toString();
      console.log(rruleStr);
      onChange(isActive ? rruleStr : "");
    } catch (error) {
      console.log(error);
    }
  }, [formData, onChange]);
  return (
    <Box>
      <FormControl as={HStack} mb={2} justifyContent="space-between">
        <HStack>
          <FormLabel my={2} htmlFor="repeats" width={16}>
            Repeats
          </FormLabel>
          <Checkbox
            id="repeats"
            pr={4}
            isChecked={isActive}
            onChange={() => toggleActive(!isActive)}
          />
          {isActive ? (
            <>
              <Select {...register("freq")} width={28}>
                <option value={RRule.DAILY}>daily</option>
                <option value={RRule.WEEKLY}>weekly</option>
                <option value={RRule.MONTHLY}>monthly</option>
                <option value={RRule.YEARLY}>yearly</option>
              </Select>
              <Text>every</Text>
              {/* @ts-ignore */}
              <NumberInput
                id="interval"
                {...register("interval", { valueAsNumber: true })}
                width={20}
                min={0}
                onChange={(e) => {
                  setValue("interval", +e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>{labels[watch("freq")].interval}</Text>
            </>
          ) : null}
        </HStack>
      </FormControl>
      {isActive ? (
        <FormControl as={HStack}>
          <FormLabel my={2} as="div" width={24}>
            Ends
          </FormLabel>
          <Select
            pl={2}
            {...register("ends", { valueAsNumber: true })}
            width={28}
          >
            <option value={0}>never</option>
            <option value={1}>on date</option>
            <option value={2}>after</option>
          </Select>
          {watch("ends") === 1 ? (
            <DateSelector
              onChange={(e) => {
                setValue("until", e);
              }}
              width={48}
            />
          ) : watch("ends") === 2 ? (
            <InputGroup width={48} as={HStack}>
              <NumberInput
                // @ts-ignore
                min={0}
                {...register("count", { valueAsNumber: true })}
                onChange={(e) => {
                  setValue("count", +e);
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>occurrences</Text>
            </InputGroup>
          ) : null}
        </FormControl>
      ) : null}
    </Box>
  );
};

export default RecurrencySetting;
