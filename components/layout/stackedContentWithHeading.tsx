import { ContentHead } from "../contentHead";
import { Heading, HeadingType, HeadingSize } from "../Heading";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";

export const StackedContentWithHeading: React.FC<{ pageName: string }> = ({
  pageName,
  children,
}) => (
  <Box width="100%">
    <Box margin="0 auto" maxW="site" padding="4">
      <ContentHead pageName={pageName} />
      <Stack spacing={4}>
        <Heading size={HeadingSize.H1} type={HeadingType.Primary}>
          {pageName}
        </Heading>
        <Stack spacing={6}>{children}</Stack>
      </Stack>
    </Box>
  </Box>
);
