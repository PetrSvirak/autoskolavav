import {
  Link,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { parse } from "himalaya";
import NextLink from "next/link";

type RichTextHtmlParserProps = {
  readonly html: string;
};

const parseText = (text) =>
  text.content.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");

const parseElement = (element, index) => {
  switch (element.tagName) {
    case "p":
      return (
        <Text key={index}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Text>
      );
    case "strong":
      return (
        <Text key={index} as="strong">
          {element.children.map((node, index) => parseNode(node, index))}
        </Text>
      );
    case "em":
      return (
        <Text key={index} as="em">
          {element.children.map((node, index) => parseNode(node, index))}
        </Text>
      );
    case "h1":
      return (
        <Heading key={index} as="h1" size="4xl">
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "h2":
      return (
        <Heading key={index} as="h2" size="3xl">
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "h3":
      return (
        <Heading key={index} as="h3" size="2xl">
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "h4":
      return (
        <Heading key={index} as="h4" size="1xl">
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "a":
      return (
        <NextLink key={index} href={element.attributes[1].value} passHref>
          <Link>
            {element.children.map((node, index) => parseNode(node, index))}
          </Link>
        </NextLink>
      );
    case "ol":
      return (
        <OrderedList key={index} listStylePosition="inside">
          {element.children.map((node, index) => parseNode(node, index))}
        </OrderedList>
      );
    case "li":
      return (
        <ListItem key={index}>
          {element.children.map((node, index) => parseNode(node, index))}
        </ListItem>
      );
    case "ul":
      return (
        <UnorderedList key={index} listStylePosition="inside">
          {element.children.map((node, index) => parseNode(node, index))}
        </UnorderedList>
      );
    default:
      return null;
  }
};

const parseNode = (node, index) => {
  switch (node.type) {
    case "element":
      return parseElement(node, index);
    case "text":
      return parseText(node);
    default:
      return null;
  }
};

export const ArticleHtmlParser: FunctionComponent<RichTextHtmlParserProps> = ({
  html,
}) => {
  const parsedHtml = parse(html);

  return parsedHtml.map((node, index) => parseNode(node, index));
};
