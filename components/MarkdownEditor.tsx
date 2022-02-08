import {
  Heading,
  List,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  Code,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  h1: (p) => <Heading mb={2} fontSize="3xl" {...p} />,
  h2: (p) => <Heading mb={2} fontSize="2xl" {...p} />,
  h3: (p) => <Heading mb={2} fontSize="xl" {...p} />,
  h4: (p) => <Heading mb={2} fontSize="lg" {...p} />,
  h5: (p) => <Heading mb={2} fontSize="md" {...p} />,
  h6: (p) => <Heading mb={2} fontSize="sm" {...p} />,
  ul: (p) => <UnorderedList mb={5} {...p} />,
  ol: (p) => <OrderedList mb={5} {...p} />,
  li: (p) => <ListItem {...p} />,
  p: (p) => <Text mb={5} {...p} />,
  code: (p) => <Code p="4" w="100%" {...p} />,
  blockquote: (p) => <Text bg="gray.100" mb={3} p="4" {...p} />,
  table: (p) => <Table {...p} />,
  thead: (p) => <Thead {...p} />,
  tbody: (p) => <Tbody {...p} />,
  tr: (p) => <Tr {...p} />,
  th: (p) => <Th {...p} />,
  td: (p) => <Td {...p} />,
};
const Editor = ({ content }) => {
  return (
    <Markdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </Markdown>
  );
};

export default Editor;
