import { Center, Container, Divider, Stack } from "@chakra-ui/react";
import { Heading, HeadingType, Size } from "../components/Heading";

const Custom500 = () => (
  <Container>
    <Center h="50vh">
      <Stack direction="row" spacing={4}>
        <Heading size={Size.H1} type={HeadingType.Secondary}>
          500
        </Heading>
        <Divider orientation="vertical" h="24" />
        <text>Na serveru došlo k chybě</text>
      </Stack>
    </Center>
  </Container>
);

export default Custom500;
