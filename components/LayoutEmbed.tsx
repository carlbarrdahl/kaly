import { Button } from "@chakra-ui/react";
import { useViewerConnection } from "@self.id/react";
import { useConnect } from "./features/auth/ConnectButton";

const ConnectButton = () => {
  const { connection, connect, disconnect } = useConnect();

  console.log(connection);
  return (
    <Button
      isLoading={["connecting", "idle"].includes(connection.status)}
      onClick={() => connect()}
    >
      Connect Wallet
    </Button>
  );
};

const LayoutEmbed = ({ children }) => {
  const [{ selfID }]: any = useViewerConnection();

  if (!selfID) {
    return <ConnectButton />;
  }

  return children;
};

export default LayoutEmbed;
