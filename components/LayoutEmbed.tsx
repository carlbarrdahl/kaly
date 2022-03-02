import { Box, Flex, Spinner, Button } from "@chakra-ui/react";
import { useViewerConnection } from "@self.id/react";
import { useConnect } from "./features/auth/ConnectButton";

const ConnectButton = () => {
  const { connection, connect, disconnect } = useConnect();

  return (
    <Button
      isLoading={["connecting"].includes(connection.status)}
      onClick={() => connect()}
    >
      Connect Wallet
    </Button>
  );
};

const Center = (props) => (
  <Flex p={8} justifyContent="center" alignItems="center" {...props} />
);
const LayoutEmbed = ({ children, isLoading, error }) => {
  const [{ selfID }]: any = useViewerConnection();

  console.log(error);
  return (
    <Box maxW="xs">
      {error ? (
        <Center>{error.message}</Center>
      ) : isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : !selfID ? (
        <Center>
          <ConnectButton />
        </Center>
      ) : (
        children
      )}
    </Box>
  );
};

export default LayoutEmbed;
