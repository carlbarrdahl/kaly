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

const accessControlConditions = [
  {
    contractAddress: "0x319ba3aab86e04a37053e984bd411b2c63bf229e",
    standardContractType: "ERC721",
    chain: 1,
    method: "balanceOf",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: ">",
      value: "0",
    },
  },
];

const TokenGate: React.FC<{
  start: any;
  onChange(rrule: string | undefined): void;
}> = ({ start, onChange = () => {} }) => {
  const [isActive, toggleActive] = useState(false);
  const { register, watch, handleSubmit, getValues, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      contractAddress: "",
      standardContractType: "ERC721",
    },
  });
  const formData = watch();
  useEffect(() => {
    try {
      // onChange(isActive ? rruleStr : undefined);
    } catch (error) {
      console.log(error);
    }
  }, [formData, onChange]);
  return (
    <Box>
      <FormControl as={HStack} mb={2} justifyContent="space-between">
        <HStack>
          <FormLabel my={2} htmlFor="gate" width={16}>
            Private
          </FormLabel>
          <Checkbox
            id="gate"
            pr={4}
            isChecked={isActive}
            onChange={() => toggleActive(!isActive)}
          />
          {isActive ? (
            <Box flex={1}>
              <HStack>
                <Input placeholder="Contract address" />
                <Input placeholder="Token amount" />
              </HStack>
            </Box>
          ) : null}
        </HStack>
      </FormControl>
    </Box>
  );
};

export default TokenGate;
