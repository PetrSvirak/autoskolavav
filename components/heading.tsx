import { Center, Heading as ChakraHeading, Link } from "@chakra-ui/react";

export const Heading = () => (
  <Center>
    <Link to="/">
      <ChakraHeading as="h1" size="xl">
        Autoškola V&V
      </ChakraHeading>
    </Link>
  </Center>
);
