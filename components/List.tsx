import {
  OrderedList as ChakraOrderedList,
  UnorderedList as ChakraUnorderedList,
} from "@chakra-ui/react";
import React from "react";

export enum ListType {
  BodyOfText = "body-of-text",
  Menu = "menu",
  MobileMenu = "mobile-menu",
  StandAlone = "stand-alone",
}

type Props = {
  readonly type: ListType;
  readonly role?: string;
};

export const UnorderedList: React.FC<Props> = ({ role, type, children }) => (
  <ChakraUnorderedList variant={type} role={role} spacing={0}>
    {children}
  </ChakraUnorderedList>
);

export const OrderedList: React.FC = ({ children }) => (
  <ChakraOrderedList variant={ListType.BodyOfText}>
    {children}
  </ChakraOrderedList>
);
