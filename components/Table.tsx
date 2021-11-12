import { Stack, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { FunctionComponent, Fragment } from "react";
import { Heading, HeadingType, Size } from "./Heading";

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
    {title && (
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        {title}
      </Heading>
    )}
    <Table size="md" variant="simple">
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
