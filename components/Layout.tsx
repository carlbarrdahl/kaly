import React, { useEffect, useState } from "react";
import { DefaultSeo, NextSeo } from "next-seo";

import {
  ButtonGroup,
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
import {
  FiHelpCircle,
  FiSearch,
  FiCalendar,
  FiClock,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { GrSchedule, GrClock } from "react-icons/gr";
import { ImCalendar, ImClock } from "react-icons/im";

import Link from "./Link";
import ConnectButton from "./features/auth/ConnectButton";
import Head from "next/head";
import { useIsFetching } from "react-query";
import HelpModal from "./HelpModal";
import Manage from "./features/calendar/Manage";

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

const SIDEBAR_WIDTH = 60;
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
      w={SIDEBAR_WIDTH}
      {...props}
    >
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Box flex="1 100%">
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
            <NavItem icon={FiCalendar} href="/">
              Calendar
            </NavItem>
            <NavItem icon={FiClock} href="/availability">
              Availability
            </NavItem>
            <NavItem icon={FiUserPlus} href="/meeting">
              Request meeting
            </NavItem>
          </Flex>
        </Box>
        <Manage />
      </Flex>
    </Box>
  );
};

const title = "kaly - Decentralized Calendar";
const description = "Web3 decentralized calendar app.";
const url = "https://kaly.vercel.app";
const Layout: React.FC = ({ children }) => {
  const sidebar = useDisclosure();
  const [isHelpModalOpen, toggleHelpModal] = useState(false);
  return (
    <Flex as="section" bg={"white"} h="100vh">
      <Head>
        <meta name="description" content="Decentralized powered by Ceramic" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: `${url}/kaly.jpg`,
              width: 1024,
              height: 537,
              alt: "Web3 Calendar",
              type: "image/jpeg",
            },
          ],
          type: "website",
          site_name: "kaly",
        }}
        // twitter={{
        //   handle: "@handle",
        //   site: "@site",
        //   cardType: "summary_large_image",
        // }}
      />
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
      <Box ml={{ base: 0, md: SIDEBAR_WIDTH }} transition=".3s ease" flex={1}>
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
          <ButtonGroup>
            <ConnectButton />
            <IconButton
              onClick={() => toggleHelpModal(!isHelpModalOpen)}
              variant="ghost"
              aria-label="Help button"
              icon={<FiHelpCircle />}
            />
          </ButtonGroup>
        </Flex>

        <Box as="main" p="4">
          {children}
        </Box>
        <HelpModal
          isOpen={isHelpModalOpen}
          onClose={() => toggleHelpModal(!isHelpModalOpen)}
        />
      </Box>
    </Flex>
  );
};

export default Layout;
