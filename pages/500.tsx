import { Center, Container, Divider, Heading, Stack } from "@chakra-ui/react";

const Custom500 = () => (
  <Container>
    <Center h="50vh">
      <Stack direction="row" spacing={4}>
        <Heading as="h1" size="xl">
          500
        </Heading>
        <Divider orientation="vertical" h="24" />
        <text>Na serveru došlo k chybě</text>
      </Stack>
    </Center>
  </Container>
);

export default Custom500;
