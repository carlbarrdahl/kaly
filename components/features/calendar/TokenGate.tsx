import {
  Box,
  HStack,
  Text,
  Input,
  Checkbox,
  FormLabel,
  FormControl,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const TokenGate: React.FC<{
  onChange(acl: any): void;
}> = ({ onChange = () => {} }) => {
  const [isActive, toggleActive] = useState(false);
  const { register, watch, handleSubmit, getValues, setValue } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      contractAddress: "",
      tokenAmount: "",
      standardContractType: "",
    },
  });
  const formData = watch();
  useEffect(() => {
    try {
      console.log(formData);
      onChange(isActive ? formData : null);
    } catch (error) {
      console.log(error);
    }
  }, [formData, onChange]);
  return (
    <form>
      <FormControl as={HStack} justifyContent="space-between">
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
                <Box>
                  <Select
                    size="sm"
                    {...register("standardContractType")}
                    onChange={(e) => {
                      console.log("val", e.target.value);
                      const { value } = e.target;
                      setValue("standardContractType", value);
                      if (!value) setValue("contractAddress", "");
                    }}
                  >
                    <option value="">ETH</option>
                    <option>ERC20</option>
                    <option>ERC721</option>
                    <option>ERC1155</option>
                  </Select>
                </Box>
                <Box>
                  <Input
                    size="sm"
                    disabled={!watch("standardContractType")}
                    pattern="0x+[A-F,a-f,0-9]{40}"
                    title="Must be a valid ERC20 contract address"
                    {...register("contractAddress")}
                    placeholder="Token address"
                  />
                </Box>
                <Box>
                  <Input
                    size="sm"
                    type="number"
                    step="0.001"
                    {...register("tokenAmount")}
                    placeholder="Min required tokens"
                  />
                </Box>
              </HStack>
            </Box>
          ) : null}
        </HStack>
      </FormControl>
    </form>
  );
};

export default TokenGate;
