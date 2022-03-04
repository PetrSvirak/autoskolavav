import { ListItem, Stack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { parse } from "himalaya";
import { Heading, HeadingSize, HeadingType } from "../Heading";
import { Link, LinkType } from "../Link";
import { isValidHttpUrl } from "../../utilities/isValidUri";
import { Text, TextType } from "../Text";
import { ListType, OrderedList, UnorderedList } from "../List";

type RichTextHtmlParserProps = {
  readonly html: string;
};

const parseText = (text): string =>
  text.content.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");

const parseElement = (element, index) => {
  switch (element.tagName) {
    case "p":
      return (
        <Text key={index} type={TextType.BodyOfText}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Text>
      );
    case "strong":
      return (
        <Text key={index} type={TextType.Bold}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Text>
      );
    case "em":
      return (
        <Text key={index} type={TextType.Italic}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Text>
      );
    case "h1":
      return (
        <Heading key={index} size={HeadingSize.H1} type={HeadingType.Secondary}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "h2":
      return (
        <Heading key={index} size={HeadingSize.H2} type={HeadingType.Secondary}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "h3":
      return (
        <Heading key={index} size={HeadingSize.H3} type={HeadingType.Secondary}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "h4":
      return (
        <Heading key={index} size={HeadingSize.H4} type={HeadingType.Secondary}>
          {element.children.map((node, index) => parseNode(node, index))}
        </Heading>
      );
    case "a":
      const href = element.attributes[1].value;
      return (
        <Link
          key={index}
          type={isValidHttpUrl(href) ? LinkType.OutSite : LinkType.InSite}
          href={href}
          text={element.children.map((node, index) => parseNode(node, index))}
        />
      );
    case "li":
      return (
        <ListItem key={index}>
          {element.children.map((node, index) => parseNode(node, index))}
        </ListItem>
      );
    case "ol":
      return (
        <OrderedList key={index}>
          {element.children.map((node, index) => parseNode(node, index))}
        </OrderedList>
      );
    case "ul":
      return (
        <UnorderedList key={index} type={ListType.BodyOfText}>
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

  return (
    <Stack spacing={4}>
      {parsedHtml.map((node, index) => parseNode(node, index))}
    </Stack>
  );
};
