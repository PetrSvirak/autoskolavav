import { As, Box, Heading as ChakraHeading } from "@chakra-ui/react";
import React from "react";

export enum Size {
  H1 = "h1",
  H2 = "h2",
}

export enum HeadingType {
  Primary = "primary",
  Secondary = "secondary",
}

type HeadingProps = Readonly<{
  size: Size;
  type: HeadingType;
}>;

const mapToAs: Record<Size, As> = {
  [Size.H1]: "h1",
  [Size.H2]: "h2",
};

export const Heading: React.FC<HeadingProps> = ({ size, type, children }) => (
  <Box bg={type} px={4} py={2} w="fit-content">
    <ChakraHeading as={mapToAs[size]} variant={type} size={size}>
      {children}
    </ChakraHeading>
  </Box>
);
