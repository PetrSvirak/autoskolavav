import { ComponentStyleConfig } from "@chakra-ui/theme/dist/types/theme.types";

export const Link: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: "Roboto Slab, serif",
    fontWeight: "normal-link",
    textColor: "secondary",
    fontSize: "16px",
    _hover: {
      textColor: "primary",
      textDecoration: "underline",
    },
  },
  variants: {
    "in-menu": {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "normal-link",
      textColor: "complement-secondary",
    },
    "in-menu-active": {
      fontFamily: "Open Sans, sans-serif",
      fontWeight: "bold-link",
      textColor: "primary",
    },
  },
};
