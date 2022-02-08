import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Flex,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useViewerConnection } from "@self.id/react";
import Avatar from "boring-avatars";
import {
  useQuery,
  useQueries,
  useQueryClient,
  useIsFetching,
} from "react-query";

async function createAuthProvider() {
  return import("@self.id/web").then(async ({ EthereumAuthProvider }) => {
    // The following assumes there is an injected `window.ethereum` provider
    const addresses = await global?.ethereum.request({
      method: "eth_requestAccounts",
    });

    return new EthereumAuthProvider(global?.ethereum, addresses[0]);
  });
}

function useConnect(autoConnect) {
  const queryClient = useQueryClient();
  const [connection, connect, disconnect] = useViewerConnection();
  const [{ refetch: _connect }, { refetch: _disconnect }] = useQueries([
    {
      queryKey: "connect",
      queryFn: () =>
        createAuthProvider()
          .then(connect)
          .then((user) => localStorage.setItem("did", user?.id || "")),
      enabled: autoConnect,
    },
    {
      queryKey: "disconnect",
      queryFn: () => {
        disconnect();
        localStorage.removeItem("did");
        queryClient.clear();
      },
      enabled: false,
    },
  ]);

  return { connection, connect: _connect, disconnect: _disconnect };
}
const ConnectButton: React.FC = () => {
  const isGlobalLoading = useIsFetching();
  const { connection, connect, disconnect } = useConnect(
    !!global.localStorage?.getItem("did")
  );

  return connection.status === "connected" ? (
    <>
      <Menu>
        <MenuButton>
          {isGlobalLoading ? (
            <Flex
              width={"40px"}
              height="40px"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size={"md"} />
            </Flex>
          ) : (
            <Avatar name={connection.selfID.id} />
          )}
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={() => disconnect()}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </>
  ) : "ethereum" in global ? (
    <Button
      loadingText="Connecting"
      isLoading={connection.status === "connecting"}
      onClick={() => connect()}
    >
      Connect
    </Button>
  ) : (
    <Text fontSize="sm">
      Get{" "}
      <Link
        as="a"
        color="blue.600"
        href="https://metamask.io/"
        target="_blank"
        rel="noreferrer"
      >
        MetaMask
      </Link>{" "}
      to authenticate.
    </Text>
  );
};

export default ConnectButton;
