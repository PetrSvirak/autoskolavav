import { Box, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { DatesTable } from "./datesTable";

export const CourseGroup: FunctionComponent<CourseGroupType> = ({
  dates,
  name,
  note,
}) => (
  <Box key={name}>
    <Stack spacing={2}>
      {dates.length > 0 ? (
        <DatesTable dates={dates} title={name} />
      ) : (
        <Text>{note}</Text>
      )}
    </Stack>
  </Box>
);
