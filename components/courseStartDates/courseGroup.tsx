import { Box, Stack, Text } from "@chakra-ui/react";
import { DatesTable } from "./datesTable";
import { FunctionComponent } from "react";
import { Heading, HeadingType, Size } from "../Heading";

export const CourseGroup: FunctionComponent<CourseGroupType> = ({
  dates,
  name,
  note,
}) => (
  <Box key={name}>
    <Stack spacing={2}>
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        {name}
      </Heading>
      {dates.length > 0 ? <DatesTable dates={dates} /> : <Text>{note}</Text>}
    </Stack>
  </Box>
);
