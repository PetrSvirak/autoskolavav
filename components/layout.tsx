import { Center, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { Menu } from "./menu";
import { SiteHeading } from "./siteHeading";

export const Layout = ({ children }) => {
  const gridConfig = useBreakpointValue({
    base: {
      h: "100vh",
      w: "100%",
      templateAreas: "'header' 'nav' 'content' 'footer'",
    },
    md: {
      h: "100vh",
      w: "800px",
      templateColumns: "250px 1fr",
      templateRows:
        "minmax(min-content, max-content) 1fr minmax(min-content, max-content)",
      templateAreas: "'header header' 'nav content' 'footer footer'",
    },
  });

  return (
    <Center>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid {...gridConfig}>
        <GridItem as="header" gridArea="header">
          <SiteHeading />
        </GridItem>
        <GridItem as="nav" gridArea="nav">
          <Menu />
        </GridItem>
        <GridItem as="main" gridArea="content">
          {children}
        </GridItem>
        <GridItem as="footer" gridArea="footer" />
      </Grid>
    </Center>
  );
};
