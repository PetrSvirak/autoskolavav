import { VStack } from "@chakra-ui/react";
import React from "react";
import Head from "next/head";
import { SiteHeading } from "./siteHeading";

export const Layout = ({ children }) => {
  return (
    <VStack width="100%" height="100%">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SiteHeading />
      {children}
    </VStack>
  );
};
