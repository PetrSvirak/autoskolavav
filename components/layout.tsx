import { Center, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { Menu } from "./menu";
import { Heading } from "./heading";

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
      templateRows: "50px 1fr 150px",
      templateAreas: "'header header' 'nav content' 'footer footer'",
    },
  });

  return (
    <Center>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid {...gridConfig}>
        <GridItem as="header" gridArea="header" bg={"yellow.100"}>
          <Heading />
        </GridItem>
        <GridItem as="nav" gridArea="nav">
          <Menu />
        </GridItem>
        <GridItem as="main" gridArea="content" bg={"blue.100"}>
          {children}
        </GridItem>
        <GridItem as="footer" gridArea="footer" bg={"orange.100"} />
      </Grid>
    </Center>
  );
};
