import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { DatesTable } from "./datesTable";
import { FunctionComponent } from "react";

export const CourseGroup: FunctionComponent<CourseGroupType> = ({
  dates,
  name,
  note,
}) => (
  <Box key={name}>
    <Stack spacing={2}>
      <Heading as="h2" size="sm">
        {name}
      </Heading>
      {dates.length > 0 ? <DatesTable dates={dates} /> : <Text>{note}</Text>}
    </Stack>
  </Box>
);
