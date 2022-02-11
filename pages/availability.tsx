import { NextPage } from "next";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

import RuleConfig from "../components/features/availability/RuleConfig";

const Availability: NextPage = () => {
  return (
    <Box>
      <SimpleGrid
        templateColumns={["none", "none", "none", "2fr 1fr"]}
        spacing="8"
      >
        <Box>
          <RuleConfig onUpdate={(data) => alert("Not implemented yet")} />
        </Box>
        <Box borderLeft="1px solid #eee" pl={8}>
          <Heading fontSize="sm">Date overrides</Heading>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Availability;
