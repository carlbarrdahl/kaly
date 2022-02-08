import NextLink, { LinkProps } from "next/link";

const Link: React.FC<LinkProps> = (props) => {
  return (
    <NextLink passHref {...props}>
      <a>{props.children}</a>
    </NextLink>
  );
};

export default Link;
