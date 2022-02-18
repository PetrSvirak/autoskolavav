import { ComponentStyleConfig } from "@chakra-ui/react";

export const Text: ComponentStyleConfig = {
  baseStyle: {
    fontFamily: "Roboto Slab, serif",
    fontWeight: "normal-text",
    fontSize: "16px",
    textColor: "complement-secondary",
  },
  variants: {
    em: {
      fontStyle: "italic",
    },
    strong: {
      fontWeight: "bold-text",
    },
    "body-of-text": {
      px: "16px",
    },
  },
};
