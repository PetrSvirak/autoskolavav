import { Td, Text, Tr } from "@chakra-ui/react";
import { formatDate } from "./utils";
import { FunctionComponent } from "react";
import { createTable, TableHeaderItem } from "../Table";

const Table = createTable<CourseDateType>();

const headerItems: TableHeaderItem[] = [
  { name: "Datum", isNumeric: true },
  { name: "Volná místa" },
];

export const DatesTable: FunctionComponent<{ dates: CourseDateType[] }> = ({
  dates,
}) => (
  <Table
    headerItems={headerItems}
    rows={dates}
    renderRow={({ date, freePlaces }) => (
      <Tr>
        <Td isNumeric>
          {formatDate(new Date(Date.parse(date.replace("Z", ""))))}
        </Td>
        <Td>
          <Text color={freePlaces > 0 ? "green" : "red"}>{freePlaces}</Text>
        </Td>
      </Tr>
    )}
  />
);
