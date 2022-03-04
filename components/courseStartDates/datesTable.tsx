import { Td, Text, Tr } from "@chakra-ui/react";
import { formatDate } from "./utils";
import { FunctionComponent } from "react";
import { createTable, TableHeaderItem } from "../Table";

const Table = createTable<CourseDateType>();

const headerItems: TableHeaderItem[] = [
  { name: "Datum" },
  { name: "Volná místa", isNumeric: true },
];

export const DatesTable: FunctionComponent<{
  dates: CourseDateType[];
  title: string;
}> = ({ dates, title }) => (
  <Table
    headerItems={headerItems}
    maxWidth="300px"
    rows={dates}
    renderRow={({ date, freePlaces }) => (
      <Tr>
        <Td>
          {formatDate(new Date(Date.parse(date.replace("Z", ""))))}
        </Td>
        <Td isNumeric>
          <Text color={freePlaces > 0 ? "green" : "red"}>{freePlaces}</Text>
        </Td>
      </Tr>
    )}
    title={title}
  />
);
