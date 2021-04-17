import { Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import { formatDate } from "./utils";
import { FunctionComponent } from "react";

export const DatesTable: FunctionComponent<{ dates: CourseDateType[] }> = ({
  dates,
}) => (
  <Table size="sm" variant="striped">
    <Thead>
      <Tr>
        <Th isNumeric>Datum</Th>
        <Th>Volná místa</Th>
      </Tr>
    </Thead>
    <Tbody>
      {dates.map(({ date, freePlaces }) => (
        <Tr key={date}>
          <Td isNumeric>
            {formatDate(new Date(Date.parse(date.replace("Z", ""))))}
          </Td>
          <Td>
            <Text color={freePlaces > 0 ? "green" : "red"}>{freePlaces}</Text>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
