import { NextPage } from "next";
import { Center, Container, Divider, Stack } from "@chakra-ui/react";
import { Heading, HeadingType, Size } from "./Heading";
import { Text, TextType } from "./Text";

export const Custom404: NextPage = () => (
  <Container>
    <Center h="50vh">
      <Stack direction="row" spacing={4}>
        <Heading size={Size.H1} type={HeadingType.Secondary}>
          404
        </Heading>
        <Divider orientation="vertical" h="24" />
        <Text type={TextType.BodyOfText}>Stránka nenalezena</Text>
      </Stack>
    </Center>
  </Container>
);
