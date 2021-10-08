import {
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { Menu } from "./menu";

const Logo = () => (
  <ChakraLink href="/" textStyle="link" _hover={{ textDecoration: "none" }}>
    <Heading as="h1" size="xl" textAlign="center">
      <Container textStyle="logo-head">V&V</Container>
      <Container textStyle="logo-tail">Autoškola</Container>
      <Container textStyle="logo-preview">
        {process.env.isPreviewSite && "👁"}
      </Container>
    </Heading>
  </ChakraLink>
);

export const SiteHeading = () => (
  <Flex maxWidth="site" padding="26px">
    <Logo />
    <Spacer width="space-menu" />
    <Menu />
  </Flex>
);
