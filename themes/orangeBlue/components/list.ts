import { ComponentStyleConfig } from "@chakra-ui/theme";
import { listAnatomy } from "@chakra-ui/anatomy";
import { PartsStyleObject } from "@chakra-ui/theme-tools";

const baseStyle: PartsStyleObject<typeof listAnatomy> = {
  container: {
    fontFamily: "Roboto Slab, serif",
    fontWeight: "normal-text",
    fontSize: "16px",
    textColor: "complement-secondary",
  },
  item: {
    mt: "4px",
  },
  icon: {},
};

const bodyOfText: PartsStyleObject<typeof listAnatomy> = {
  container: {
    pl: "16px",
    listStylePosition: "inside",
  },
  item: {},
  icon: {},
};

const menu: PartsStyleObject<typeof listAnatomy> = {
  container: {},
  item: {
    listStyle: "none",
  },
  icon: {},
};

const mobileMenu: PartsStyleObject<typeof listAnatomy> = {
  container: {
    marginInlineStart: 0,
    ml: 0,
  },
  item: {
    listStyle: "none",
    mt: 0,
  },
  icon: {},
};

export const List: ComponentStyleConfig = {
  parts: listAnatomy.keys,
  baseStyle,
  variants: {
    "body-of-text": bodyOfText,
    menu,
    mobileMenu,
  },
};
