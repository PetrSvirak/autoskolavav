import { Box, Stack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { DatesTable } from "./datesTable";
import {Text, TextType} from "../Text";

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
        <Text type={TextType.BodyOfText}>{note}</Text>
      )}
    </Stack>
  </Box>
);
