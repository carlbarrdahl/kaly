import {
  Box,
  Flex,
  FormControl,
  Input,
  HStack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useFieldArray } from "react-hook-form";
import { forwardRef } from "react";

const TimeInput = forwardRef(function TimeInput(props, ref) {
  return (
    <Input
      // @ts-ignore
      ref={ref}
      autoFocus
      required
      width="24"
      pattern="([0-1]{1}[0-9]{1}|20|21|22|23):[0-5]{1}[0-9]{1}"
      {...props}
    />
  );
});

const IntervalsConfig = ({ index, control, register, onRemove }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `rules.${index}.intervals`,
  });

  return (
    <>
      <Box>
        {fields.map((interval: any, i) => {
          const createTimeProps = (start) =>
            register(`rules[${index}].intervals[${i}].${start}`, {
              required: true,
            });
          return (
            <Box key={interval.wday} mb={2}>
              <Flex>
                <FormControl ml="8" flex={"0"}>
                  <HStack divider={<Text px={2}>-</Text>}>
                    <TimeInput {...createTimeProps("from")} />
                    <TimeInput {...createTimeProps("to")} />
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

export default IntervalsConfig;
