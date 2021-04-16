import {
  Link,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import React from "react";
import { parse } from "himalaya";
import { NextPage } from "next";
import NextLink from "next/link";

type RichTextHtmlParserProps = {
  readonly html: string;
};

const parseText = (text) => {
  return text.content.replace("&nbsp;", " ");
};

const parseElement = (element) => {
  switch (element.tagName) {
    case "p":
      return <Text>{element.children.map((node) => parseNode(node))}</Text>;
    case "strong":
      return (
        <Text as="strong">
          {element.children.map((node) => parseNode(node))}
        </Text>
      );
    case "em":
      return (
        <Text as="em">{element.children.map((node) => parseNode(node))}</Text>
      );
    case "h1":
      return (
        <Heading as="h1" size="4xl">
          {element.children.map((node) => parseNode(node))}
        </Heading>
      );
    case "h2":
      return (
        <Heading as="h2" size="3xl">
          {element.children.map((node) => parseNode(node))}
        </Heading>
      );
    case "h3":
      return (
        <Heading as="h3" size="2xl">
          {element.children.map((node) => parseNode(node))}
        </Heading>
      );
    case "h4":
      return (
        <Heading as="h4" size="1xl">
          {element.children.map((node) => parseNode(node))}
        </Heading>
      );
    case "a":
      return (
        <NextLink href={element.attributes[1].value} passHref>
          <Link>{element.children.map((node) => parseNode(node))}</Link>
        </NextLink>
      );
    case "ol":
      return (
        <OrderedList>
          {element.children.map((node) => parseNode(node))}
        </OrderedList>
      );
    case "li":
      return (
        <ListItem>{element.children.map((node) => parseNode(node))}</ListItem>
      );
    case "ul":
      return (
        <UnorderedList>
          {element.children.map((node) => parseNode(node))}
        </UnorderedList>
      );
    default:
      return null;
  }
};

const parseNode = (node) => {
  switch (node.type) {
    case "element":
      return parseElement(node);
    case "text":
      return parseText(node);
    default:
      return null;
  }
};

const ArticleHtmlParser: NextPage<RichTextHtmlParserProps> = ({ html }) => {
  const parsedHtml = parse(html);
  return parsedHtml.map((node) => parseNode(node));
};

export default ArticleHtmlParser;
