import { extendTheme } from "@chakra-ui/react";
import { colors } from "./orangeBlue/colors";
import { Button } from "./orangeBlue/components/button";
import { Heading } from "./orangeBlue/components/heading";
import { sizes } from "./orangeBlue/sizes";
import { fontWeights, textStyles } from "./orangeBlue/textStyles";
import { breakpoints } from "./orangeBlue/breakpoints";

export const orangeBlueTheme = extendTheme({
  colors,
  components: {
    Button,
    Heading,
  },
  fontWeights,
  sizes,
  textStyles,
  breakpoints,
  styles: {
    global: {
      "html, body, #__next": {
        height: "100%"
      },
    },
  },
});
