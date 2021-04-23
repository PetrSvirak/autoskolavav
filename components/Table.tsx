import { Heading, Stack, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { FunctionComponent, Fragment } from "react";

export type TableHeaderItem = {
  readonly name: string;
  readonly isNumeric?: boolean;
};

type TableProps<TableRow> = {
  readonly headerItems: TableHeaderItem[];
  readonly rows: TableRow[];
  readonly renderRow: (row: TableRow) => React.ReactNode;
  readonly additionalRow?: React.ReactNode;
  readonly title?: string;
};

export const createTable = <TableRow extends object>(): FunctionComponent<
  TableProps<TableRow>
> => ({ headerItems, rows, renderRow, additionalRow, title }) => (
  <Stack spacing={2}>
    <Heading as="h2" size="sm">
      {title}
    </Heading>
    <Table size="sm" variant="striped">
      <Thead>
        <Tr>
          {headerItems.map((item, index) => (
            <Th key={index} isNumeric={item.isNumeric}>
              {item.name}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row, index) => (
          <Fragment key={index}>{renderRow(row)}</Fragment>
        ))}
        {additionalRow}
      </Tbody>
    </Table>
  </Stack>
);
