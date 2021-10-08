import React from "react";
import { Button as ChakraButton } from "@chakra-ui/react";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Ternary = "ternary",
}

export type ButtonProps = {
  readonly type: ButtonType;
};

export const Button: React.FC<ButtonProps> = ({ type, children }) => (
  <ChakraButton variant={type}>{children}</ChakraButton>
);
