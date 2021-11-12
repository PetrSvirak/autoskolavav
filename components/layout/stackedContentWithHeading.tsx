import { ContentHead } from "../contentHead";
import { Heading, HeadingType, Size } from "../Heading";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";

export const StackedContentWithHeading: React.FC<{ pageName: string }> = ({
  pageName,
  children,
}) => (
  <Box width="100%">
    <Box margin="0 auto" maxW="site" padding="4">
      <ContentHead pageName={pageName} />
      <Stack spacing={8}>
        <Heading size={Size.H1} type={HeadingType.Secondary}>
          {pageName}
        </Heading>
        {children}
      </Stack>
    </Box>
  </Box>
);
