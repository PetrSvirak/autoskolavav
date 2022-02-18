import {
  Box,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { Menu } from "./menu";
import { useShouldShowMobileMenu } from "../../hooks/useShouldShowMobileMenu";

const Logo = () => {
  const isMobile = useShouldShowMobileMenu();
  return (
    <ChakraLink href="/" textStyle="link" _hover={{ textDecoration: "none" }}>
      <Heading as="h1" p={isMobile ? 0 : undefined} textAlign="center">
        <Container textStyle="logo-head" fontSize={isMobile ? 48 : undefined}>
          V&V
        </Container>
        <Container textStyle="logo-tail" fontSize={isMobile ? 14 : undefined}>
          Autoškola
        </Container>
        <Container
          textStyle="logo-preview"
          fontSize={isMobile ? 16 : undefined}
        >
          {process.env.isPreviewSite && "👁"}
        </Container>
      </Heading>
    </ChakraLink>
  );
};

export const SiteHeading = () => {
  const isMobile = useShouldShowMobileMenu();

  const desktopPadding = "26px";

  return (
    <Flex
      maxWidth="site"
      pb={isMobile ? 0 : desktopPadding}
      pt={isMobile ? 4 : desktopPadding}
      px={desktopPadding}
      width="100%"
    >
      <Logo />
      <Spacer />
      <Box pt={isMobile ? 4 : undefined}>
        <Menu />
      </Box>
    </Flex>
  );
};
