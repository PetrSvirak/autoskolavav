import { As, Box, Heading as ChakraHeading } from "@chakra-ui/react";
import React from "react";

export enum HeadingSize {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
}

export enum HeadingType {
  Primary = "primary",
  Secondary = "secondary",
}

type HeadingProps = Readonly<{
  size: HeadingSize;
  type: HeadingType;
}>;

const mapToAs: Record<HeadingSize, As> = {
  [HeadingSize.H1]: "h1",
  [HeadingSize.H2]: "h2",
  [HeadingSize.H3]: "h3",
  [HeadingSize.H4]: "h4",
};

export const Heading: React.FC<HeadingProps> = ({ size, type, children }) => (
  <Box bg={type} w="fit-content" mb={2}>
    <ChakraHeading as={mapToAs[size]} variant={type} size={size}>
      {children}
    </ChakraHeading>
  </Box>
);
