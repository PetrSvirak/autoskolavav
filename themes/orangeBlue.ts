import { extendTheme } from "@chakra-ui/react";
import { colors } from "./orangeBlue/colors";
import { Button } from "./orangeBlue/components/button";
import { Heading } from "./orangeBlue/components/heading";
import { sizes } from "./orangeBlue/sizes";
import { fontWeights, textStyles } from "./orangeBlue/textStyles";
import { breakpoints } from "./orangeBlue/breakpoints";
import { Link } from "./orangeBlue/components/link";
import { Table } from "./orangeBlue/components/table";

export const orangeBlueTheme = extendTheme({
  colors,
  components: {
    Button,
    Heading,
    Link,
    Table,
  },
  fontWeights,
  sizes,
  textStyles,
  breakpoints,
});
