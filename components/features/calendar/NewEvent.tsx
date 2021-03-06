import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Checkbox,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  HStack,
  Popover,
  PopoverBody,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { CreatableSelect } from "chakra-react-select";
import { format, isValid } from "date-fns";
import {
  Calendar,
  CalendarControls,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
  CalendarDefaultTheme,
  CalendarDate,
  CalendarPrevButton,
  CalendarNextButton,
} from "@uselessdev/datepicker";

import { Event } from "../../../schemas/event";
import { useEffect, useRef, useState } from "react";
import RecurrencySetting from "./RecurrencySetting";
import DateSelector from "../../DateSelector";

const formatDate = (date) => date && format(date, "yyyy-MM-dd'T'HH:mm");

export const DateTimeInput = ({ value, ...props }) => {
  return (
    <Input
      type="datetime-local"
      value={value ? formatDate(value) : ""}
      {...props}
    />
  );
};

const options = [
  {
    label: "15 minutes",
    value: "15",
  },
  {
    label: "30 minutes",
    value: "30",
  },
  {
    label: "45 minutes",
    value: "45",
  },
  {
    label: "60 minutes",
    value: "60",
  },
];
const DurationInput = ({ ...props }) => {
  return (
    <Controller
      {...props}
      name="duration"
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <CreatableSelect
            options={options}
            formatCreateLabel={(v) => `Add ${v}`}
            value={{ value: value.value, label: `${value} minutes` }}
            onChange={(e) => e && onChange(isNaN(e.value) ? "30" : e.value)}
            {...field}
          />
        );
      }}
    />
  );
};

const NewEvent = ({ event, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<Event>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      start: event.start,
      end: event.end,
      title: "",
      description: "",
      duration: options[1].value,
      url: "",
      attendees: [],
      // allDay: event.allDay,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((form) => {
        console.log("Submit form", form);
        // onClose(form);
      })}
    >
      <FormControl>
        <FormLabel mb={0} htmlFor="title">
          Title
        </FormLabel>
        <Input
          autoFocus
          id="title"
          placeholder="Scheduled event"
          {...register("title", { required: true })}
        />
      </FormControl>

      <FormControl mt={2} mb={2}>
        <FormLabel mb={0} htmlFor="duration">
          Duration
        </FormLabel>
        <DurationInput
          control={control}
          id="duration"
          {...register("duration", {})}
        />
      </FormControl>

      <HStack mt={2} mb={2}>
        <FormControl>
          <FormLabel mb={0} htmlFor="start">
            Start
          </FormLabel>
          <DateSelector
            // @ts-ignore
            value={watch("start")}
            formatStyle="EEE dd MMM yyyy HH:mm"
            onChange={(val) => setValue("start", val)}
          />
        </FormControl>
      </HStack>
      <FormControl mt={2} mb={2}>
        <RecurrencySetting
          start={watch("start")}
          onChange={(rrule) => setValue("rrule", rrule)}
        />
      </FormControl>
      <FormControl mt={2} mb={2}>
        <FormLabel mb={0} htmlFor="description">
          Description
        </FormLabel>
        <Textarea
          id="description"
          rows={4}
          placeholder={`# Meeting
  - Markdown is supported
                  `}
          {...register("description", {})}
        />
      </FormControl>

      <ButtonGroup>
        <Button px={7} isLoading={isLoading} type="submit" colorScheme="blue">
          Save
        </Button>
      </ButtonGroup>
    </form>
  );
};
export default NewEvent;
