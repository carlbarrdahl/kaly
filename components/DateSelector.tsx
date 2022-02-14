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

import { useEffect, useRef, useState, ChangeEvent } from "react";

const FORMAT_STYLE = "EEE dd MMM yyyy";
const DateSelector = ({
  formatStyle = FORMAT_STYLE,
  width,
  isDisabled = false,
  onChange,
}) => {
  const [date, setDate] = useState<CalendarDate>();
  const [value, setValue] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const calendarRef = useRef(null);

  const handleSelectDate = (date) => {
    setDate(date);
    setValue(() => (isValid(date) ? format(date, formatStyle) : ""));
    onClose();
    onChange(date);
  };

  const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);

    if (match(target.value)) {
      onClose();
    }
  };

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  });

  useEffect(() => {
    if (match(value)) {
      const date = new Date(value);

      return setDate(date);
    }
  }, [value]);

  return (
    <Box>
      <Popover
        placement="auto-start"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        isLazy
      >
        <PopoverTrigger>
          <Box onClick={onOpen} ref={initialRef}>
            <Input
              isDisabled={isDisabled}
              width={width}
              placeholder={format(new Date(), formatStyle)}
              value={value}
              onChange={handleInputChange}
            />
          </Box>
        </PopoverTrigger>

        <PopoverContent
          p={0}
          w="min-content"
          border="none"
          outline="none"
          _focus={{ boxShadow: "none" }}
          ref={calendarRef}
        >
          <Calendar
            value={{ start: date }}
            onSelectDate={handleSelectDate}
            singleDateSelection
          >
            <PopoverBody p={0}>
              <CalendarControls>
                <CalendarPrevButton />
                <CalendarNextButton />
              </CalendarControls>

              <CalendarMonths>
                <CalendarMonth>
                  <CalendarMonthName />
                  <CalendarWeek />
                  <CalendarDays />
                </CalendarMonth>
              </CalendarMonths>
            </PopoverBody>
          </Calendar>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default DateSelector;
