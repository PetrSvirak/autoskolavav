import { Center, Container, Divider, Heading, Stack } from "@chakra-ui/react";

const custom404: React.FunctionComponent = () => (
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

export default custom404;
