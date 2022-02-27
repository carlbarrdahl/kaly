import {
  Box,
  Input,
  Flex,
  HStack,
  Button,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { NextPage } from "next";

import {
  addDays,
  format,
  isToday,
  isTomorrow,
  roundToNearestMinutes,
  set,
} from "date-fns";
import LayoutEmbed from "../../../components/LayoutEmbed";
import { Controller, useForm } from "react-hook-form";
import CalendarPopover from "../../../components/features/calendar/CalendarPopover";
import { CreatableSelect } from "chakra-react-select";
import { useCreateEvent } from "../../../hooks/events";
import Link from "next/link";

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

const SelectDate = (props) => {
  return (
    <Controller
      {...props}
      name="start"
      render={({ field: { onChange, value, ...field } }) => {
        const date = new Date(value);
        return (
          <Flex justifyContent={"space-between"} mb={2} {...field}>
            <Button
              minW={82}
              colorScheme={isToday(date) ? "blue" : "gray"}
              onClick={() => onChange(new Date().toISOString())}
            >
              Today
            </Button>
            <Button
              minW={82}
              colorScheme={isTomorrow(date) ? "blue" : "gray"}
              onClick={() => onChange(addDays(new Date(), 1).toISOString())}
            >
              Tomorrow
            </Button>
            <CalendarPopover onChange={onChange}>
              <Button
                minW={82}
                colorScheme={
                  isToday(date) || isTomorrow(date) ? "gray" : "blue"
                }
              >
                {isToday(date) || isTomorrow(date)
                  ? "Pick"
                  : format(date, "dd MMM")}
              </Button>
            </CalendarPopover>
          </Flex>
        );
      }}
    />
  );
};

const CreateEventForm = ({ isCreating, onCreate }) => {
  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      title: "Random event",
      start: new Date().toISOString(),
      starttime: format(
        roundToNearestMinutes(new Date(), { nearestTo: 30 }),
        "HH:mm"
      ),
      duration: 30,
    },
  });

  console.log("start", watch("start"));
  return (
    <form
      onSubmit={handleSubmit(async ({ title, starttime, start, duration }) => {
        const [hours, minutes] = starttime.split(":").map(Number);
        const event = {
          title,
          start: set(new Date(start), { hours, minutes }),
          duration: `P${duration}M`,
        };
        console.log(event);

        onCreate(event);
      })}
    >
      <FormControl mb={2}>
        <Input
          autoFocus
          id="title"
          placeholder="Event title"
          {...register("title", { required: true })}
        />
      </FormControl>
      <SelectDate control={control} mb={2} />
      <FormControl mb={2}>
        <Input
          id="starttime"
          type="time"
          {...register("starttime", { required: true })}
        />
      </FormControl>
      <FormControl mb={2}>
        <DurationInput
          control={control}
          id="duration"
          {...register("duration", {})}
        />
      </FormControl>
      <Button isLoading={isCreating} type="submit" isFullWidth>
        Create
      </Button>
    </form>
  );
};

const EventEmbed: NextPage = () => {
  const createEvent = useCreateEvent();

  return (
    <LayoutEmbed>
      <Box maxW={"xs"}>
        {true || createEvent.isSuccess ? (
          <Box>
            <a
              target="_blank"
              href={`${global.location?.origin}/event/${createEvent.data?.id}`}
              rel="noreferrer"
            >
              <Button>Open event</Button>
            </a>
          </Box>
        ) : (
          <CreateEventForm
            isCreating={createEvent.isLoading}
            onCreate={createEvent.mutate}
          />
        )}
      </Box>
    </LayoutEmbed>
  );
};

export default EventEmbed;
