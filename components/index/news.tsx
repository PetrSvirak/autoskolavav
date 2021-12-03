import { Box, Stack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Heading, HeadingType, Size } from "../Heading";
import { Text } from "../Text";

type NewsProps = {
  readonly news: readonly NewsViewType[];
};

export const News: FunctionComponent<NewsProps> = ({ news }) => (
  <Stack spacing={3} direction={{ base: "column", md: "column" }}>
    <Heading size={Size.H1} type={HeadingType.Primary}>
      Aktuality
    </Heading>
    {news.map((action, index) => (
      <Box bg="white" w="fit-content" p={1} key={index}>
        <Text textStyle="news">{action.subtitle}</Text>
      </Box>
    ))}
  </Stack>
);
