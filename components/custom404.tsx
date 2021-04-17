import { NextPage } from "next";
import { Center, Container, Divider, Heading, Stack } from "@chakra-ui/react";

export const Custom404: NextPage = () => (
  <Container>
    <Center h="50vh">
      <Stack direction="row" spacing={4}>
        <Heading as="h1" size="xl">
          404
        </Heading>
        <Divider orientation="vertical" h="24" />
        <text>Stránka nenalezena</text>
      </Stack>
    </Center>
  </Container>
);
