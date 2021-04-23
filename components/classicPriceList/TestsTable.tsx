import { Td, Tr, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { createTable, TableHeaderItem } from "../Table";

export type Test = {
  name: string;
  wholeName: string;
  note?: string;
  price?: number;
};

const Table = createTable<Test>();

const headerItems: TableHeaderItem[] = [{ name: "Zkouška" }, { name: "Cena" }];

export const TestsTable: FunctionComponent<{
  tests: Test[];
  title: string;
}> = ({ tests, title }) => (
  <Table
    title={title}
    headerItems={headerItems}
    rows={tests}
    renderRow={({ name, wholeName, note, price }) => (
      <Tr>
        <Td>
          {name}
          <Text fontSize="xs">{wholeName}</Text>
        </Td>
        <Td>{price ? <>{price} Kč</> : note}</Td>
      </Tr>
    )}
  />
);
