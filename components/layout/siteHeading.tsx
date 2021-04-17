import { Heading, Link } from "@chakra-ui/react";

export const SiteHeading = () => (
  <Link to="/">
    <Heading as="h1" size="xl" textAlign="center">
      {process.env.isPreviewSite && "Náhled nepublikovaného obsahu stránek"}{" "}
      Autoškola V&V
    </Heading>
  </Link>
);
