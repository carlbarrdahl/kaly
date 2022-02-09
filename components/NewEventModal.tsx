import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Checkbox,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { CreatableSelect } from "chakra-react-select";
import { format } from "date-fns";
import { isENS, isEthereumAddress, isSupportedDID } from "../utils/address";

import { Event } from "../schemas/event";

const formatDate = (date) => date && format(date, "yyyy-MM-dd'T'HH:mm");

export const DateTimeInput = ({ value, ...props }) => {
  console.log("DATETIME", value, props);
  return (
    <Input
      type="datetime-local"
      value={value ? format(new Date(value), "yyyy-MM-dd'T'hh:mm") : ""}
      {...props}
    />
  );
};

const AttendeesInput = ({ setError, ...props }) => {
  return (
    <Controller
      {...props}
      name="attendees"
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <CreatableSelect
            placeholder="Enter any ETH address..."
            formatCreateLabel={(v) => `Add ${v}`}
            isMulti
            value={value.map((value) => ({ value, label: value }))}
            onChange={(e) => {
              // Check if entered address is valid
              const isValid = (v) => isEthereumAddress(v); // || isSupportedDID(v)  || isENS(v)

              const error = e.map((v) => v.value).filter((v) => !isValid(v))[0];

              if (!error) {
                onChange(e.map((v) => v.value));
              } else {
                setError("attendees", {
                  type: "manual",
                  message: `${error} is not a valid address`,
                });
              }
            }}
            {...field}
          />
        );
      }}
    />
  );
};
const NewEventModal = ({ event, isLoading, isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
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
      url: "",
      attendees: [],
      // allDay: event.allDay,
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="xl">
      {/* <ModalOverlay /> */}
      <ModalContent shadow="dark-lg">
        <form
          onSubmit={handleSubmit((form) => {
            onClose(form);
            // reset();
          })}
        >
          <ModalHeader> </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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

            <FormControl mt={2}>
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
            <FormControl mt={2} isInvalid={!!errors.attendees}>
              <FormLabel mb={0} htmlFor="attendees">
                Attendees
              </FormLabel>
              {
                errors.attendees ? (
                  <FormErrorMessage>
                    {(errors.attendees as any).message}
                  </FormErrorMessage>
                ) : null
                // <FormHelperText>
                //   Enter eth address (ENS support coming)
                // </FormHelperText>
              }

              <AttendeesInput
                control={control}
                {...register("attendees")}
                setError={setError}
              />
            </FormControl>
            <HStack mt={2}>
              <FormControl>
                <FormLabel mb={0} htmlFor="start">
                  Start
                </FormLabel>
                <Input
                  pr={0}
                  size="sm"
                  type="datetime-local"
                  id="start"
                  value={formatDate(getValues("start"))}
                  {...register("start", { required: true, valueAsDate: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel mb={0}>End</FormLabel>
                <Input
                  pr={0}
                  size="sm"
                  type="datetime-local"
                  id="end"
                  value={formatDate(getValues("end"))}
                  {...register("end", { valueAsDate: true })}
                />
              </FormControl>
            </HStack>
            {/* <Flex>
              <FormControl>
                <FormLabel mb={0} htmlFor="allDay">
                  All day?
                </FormLabel>
                <Checkbox id="allDay" {...register("allDay")} />
              </FormControl>
            </Flex> */}
            <FormControl mt={2}>
              <FormLabel mb={0}>URL</FormLabel>
              <Input placeholder="https://" {...register("url", {})} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button
                variant="ghost"
                disabled={isLoading}
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                px={7}
                isLoading={isLoading}
                type="submit"
                colorScheme="blue"
              >
                Save
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default NewEventModal;
