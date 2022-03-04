import { extendTheme } from "@chakra-ui/react";
import { colors } from "./orangeBlue/colors";
import { Button } from "./orangeBlue/components/button";
import { Heading } from "./orangeBlue/components/heading";
import { sizes } from "./orangeBlue/sizes";
import { fontWeights, textStyles } from "./orangeBlue/textStyles";
import { breakpoints } from "./orangeBlue/breakpoints";
import { Link } from "./orangeBlue/components/link";
import { Table } from "./orangeBlue/components/table";
import { List } from "./orangeBlue/components/list";
import { Text } from "./orangeBlue/components/text";

export const orangeBlueTheme = extendTheme({
  colors,
  components: {
    Button,
    Heading,
    Link,
    List,
    Table,
    Text,
  },
  fontWeights,
  sizes,
  textStyles,
  breakpoints,
  styles: {
    global: {
      "html, body, #__next": {
        fontFamily: "Roboto Slab, serif",
        fontWeight: "normal-text",
        fontSize: "16px",
        textColor: "complement-secondary",
        height: "100%",
        lineHeight: "tall",
      },
    },
  },
});
