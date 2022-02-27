import { NextPage } from "next";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

import RuleConfig from "../components/features/availability/RuleConfig";
import Layout from "../components/Layout";

const Availability: NextPage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Availability;
