import { ComponentStyleConfig } from "@chakra-ui/react";

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: "Open Sans, sans-serif",
    textColor: "complement-primary",
    px: 4,
    py: 2,
  },
  variants: {
    primary: {},
    secondary: {},
  },
  sizes: {
    h1: {
      fontWeight: 600,
      fontSize: "25px",
    },
    h2: {
      fontWeight: 600,
      fontSize: "20px",
    },
  },
};
