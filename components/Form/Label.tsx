import { FormLabel } from "@chakra-ui/react";

const Label: React.FC = (props) => (
  <FormLabel
    textTransform="uppercase"
    letterSpacing={1}
    color="gray.600"
    fontSize="xs"
    {...props}
  />
);

export default Label;
