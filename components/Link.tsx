import NextLink from "next/link";

export default function (props) {
  return (
    <NextLink passHref {...props}>
      <a>{props.children}</a>
    </NextLink>
  );
}
