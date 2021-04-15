import { Center, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";

export const Layout = ({ children }) => {
  const gridConfig = useBreakpointValue({
    md: {
      h: "100vh",
      w: "800px",
      templateColumns: "200px 1fr",
      templateRows: "200px 1fr 200px",
      templateAreas: "'header header' 'nav content' 'footer footer'",
    },
    sm: {
      h: "100vh",
      w: "100%",
      templateAreas: "'header' 'nav' 'content' 'footer'",
    },
  });

  return (
    <Center>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid {...gridConfig}>
        <GridItem as="header" gridArea="header" bg={"yellow"} />
        <GridItem as="nav" gridArea="nav" bg={"red"} />
        <GridItem as="main" gridArea="content" bg={"blue"}>
          {children}
        </GridItem>
        <GridItem as="footer" gridArea="footer" bg={"orange"} />
      </Grid>
    </Center>
  );
};
