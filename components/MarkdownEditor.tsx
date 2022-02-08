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
  h1: (p) => <Heading fontSize="3xl" {...p} />,
  h2: (p) => <Heading fontSize="2xl" {...p} />,
  h3: (p) => <Heading fontSize="xl" {...p} />,
  h4: (p) => <Heading fontSize="lg" {...p} />,
  h5: (p) => <Heading fontSize="md" {...p} />,
  h6: (p) => <Heading fontSize="sm" {...p} />,
  ul: (p) => <UnorderedList mb="2" {...p} />,
  ol: (p) => <OrderedList mb="2" {...p} />,
  li: (p) => <ListItem {...p} />,
  p: (p) => <Text mb="2" {...p} />,
  code: (p) => <Code p="4" w="100%" {...p} />,
  blockquote: (p) => <Text bg="gray.100" mb="2" p="4" {...p} />,
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
