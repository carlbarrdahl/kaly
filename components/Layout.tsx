import React, { useEffect } from "react";
import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  Icon,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  InputGroup,
  IconButton,
  Input,
  InputLeftElement,
  InputRightElement,
  Kbd,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { GrSchedule, GrClock } from "react-icons/gr";
import { ImCalendar, ImClock } from "react-icons/im";
import { FiSearch } from "react-icons/fi";

import Link from "./Link";
import ConnectButton from "./ConnectButton";
import Head from "next/head";
import { useIsFetching } from "react-query";

const NavItem = ({ icon, children, disabled = false, href = "#", ...rest }) => {
  return (
    <Link href={href}>
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontSize="lg"
        transition=".15s ease"
        opacity={disabled ? 0.3 : 1}
        {...rest}
      >
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: useColorModeValue("gray.600", "gray.300"),
          }}
          as={icon}
        />

        {children}
      </Flex>
    </Link>
  );
};

const SidebarContent = (props) => {
  const isGlobalLoading = useIsFetching();
  return (
    <Box
      as="nav"
      maxHeight="100vh"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w={40}
      {...props}
    >
      <Text
        pt={4}
        fontSize="2xl"
        // ml="2"
        color={useColorModeValue("brand.500", "white")}
        fontWeight="semibold"
        textAlign="center"
      >
        kaly
      </Text>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={ImCalendar} href="/">
          Calendar
        </NavItem>
        <NavItem icon={ImClock} href="/availability">
          Availability
        </NavItem>

        <NavItem disabled icon={BsGearFill}>
          Settings
        </NavItem>
      </Flex>
    </Box>
  );
};

const Layout: React.FC = ({ children }) => {
  const sidebar = useDisclosure();

  return (
    <Flex as="section" bg={"white"} h="100vh">
      <Head>
        <title>kaly - Cecentralized Calendar</title>
        <meta name="description" content="Decentralized powered by Ceramic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 40 }} transition=".3s ease" flex={1}>
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px={4}
          h={14}
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            // icon={<FiMenu />}
            size="sm"
          />
          <InputGroup
            display={{ base: "none", md: "flex" }}
            maxW={["100%"]}
            mr={4}
          >
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input disabled placeholder="Jump to..." />
            <InputRightElement width="5rem" opacity={0.3}>
              <Kbd>CTRL</Kbd>
              <Kbd>K</Kbd>
            </InputRightElement>
          </InputGroup>
          <Flex>
            <ConnectButton />
          </Flex>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
