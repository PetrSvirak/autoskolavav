import { As, Text as ChakraText } from "@chakra-ui/react";
import React from "react";
import { textStyles } from "../themes/orangeBlue/textStyles";

export enum TextType {
  BodyOfText = "body-of-text",
  Bold = "strong",
  Inline = "",
  Italic = "em",
}

type TypedTextProps = {
  readonly type: TextType;
};

type StyledTextProp = {
  readonly textStyle: keyof typeof textStyles;
};

type TextProps = TypedTextProps | StyledTextProp;

const mapToAs: Record<TextType, As> = {
  [TextType.BodyOfText]: "p",
  [TextType.Bold]: "strong",
  [TextType.Inline]: "p",
  [TextType.Italic]: "em",
};

const TypedText: React.FC<TypedTextProps> = ({ type, children, ...props }) => (
  <ChakraText variant={type} as={mapToAs[type]}>
    {children}
  </ChakraText>
);

const StyleText: React.FC<StyledTextProp> = ({ textStyle, children }) => (
  <ChakraText textStyle={textStyle}>{children}</ChakraText>
);

const isTypedTextProps = (props: TextProps): props is TypedTextProps =>
  !!(props as TypedTextProps).type;

export const Text: React.FC<TextProps> = (props) =>
  isTypedTextProps(props) ? <TypedText {...props} /> : <StyleText {...props} />;
