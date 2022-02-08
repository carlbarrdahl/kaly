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
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CreatableSelect } from "chakra-react-select";
import { format } from "date-fns";
import { useCore } from "@self.id/react";
import {
  addressToDid,
  isENS,
  isEthereumAddress,
  isSupportedDID,
} from "../utils/address";

const formatDate = (date) =>
  date && format(date, "yyyy-MM-dd'T'HH:mm", { awareOfUnicodeTokens: true });

export const DateTimeInput = ({ value, ...props }) => (
  <Input type="datetime-local" value={formatDate(value)} {...props} />
);

const AttendeesInput = ({ setError, ...props }) => {
  return (
    <Controller
      {...props}
      render={({ field: { onChange, ...field } }) => (
        <CreatableSelect
          formatCreateLabel={(v) => `Add ${v}`}
          isMulti
          onChange={(e) => {
            // Check if entered address is valid
            const isValid = (v) => isEthereumAddress(v); // || isSupportedDID(v)  || isENS(v)

            const error = e.map((v) => v.value).filter((v) => !isValid(v))[0];

            if (!error) {
              onChange(e);
            } else {
              setError("attendees", {
                type: "manual",
                message: `${error} is not a valid address`,
              });
            }
          }}
          {...field}
        />
      )}
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
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      start: event.start,
      end: event.end,
      title: "",
      description: "",
      url: "",
      attendees: [],
      allDay: event.allDay,
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <form
          onSubmit={handleSubmit((form) => {
            form.attendees = form.attendees.map((a) => a.value);

            onClose(form);
            reset();
          })}
        >
          <ModalHeader>New event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                autoFocus
                id="title"
                placeholder="Title"
                {...register("title", { required: true })}
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="Description"
                {...register("description", {})}
              />
            </FormControl>
            <FormControl mt={2} isInvalid={errors.attendees}>
              <FormLabel htmlFor="attendees">Attendees</FormLabel>
              {errors.attendees ? (
                <FormErrorMessage>{errors.attendees.message}</FormErrorMessage>
              ) : (
                <FormHelperText>
                  Enter eth address (ENS support coming)
                </FormHelperText>
              )}

              <AttendeesInput
                name="attendees"
                control={control}
                {...(register("attendees"),
                {
                  validate: {
                    did: (v) => {
                      console.log("validate", v);
                      return true;
                    },
                  },
                })}
                setError={setError}
              />
            </FormControl>
            <HStack mt={2}>
              {/* <FormControl>
                <FormLabel htmlFor="allDay">All day?</FormLabel>
                <Checkbox id="allDay" {...register("allDay")} />
              </FormControl> */}
              <FormControl>
                <FormLabel htmlFor="start">Start</FormLabel>
                <Input
                  type="datetime-local"
                  id="start"
                  value={formatDate(getValues("start"))}
                  {...register("start", { required: true, valueAsDate: true })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End</FormLabel>
                <Input
                  type="datetime-local"
                  id="end"
                  value={formatDate(getValues("end"))}
                  {...register("end", { valueAsDate: true })}
                />
              </FormControl>
            </HStack>
            <FormControl mt={2}>
              <FormLabel>URL</FormLabel>
              <Input placeholder="https://" {...register("url", {})} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={isLoading}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button disabled={isLoading} onClick={() => onClose()}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
export default NewEventModal;
