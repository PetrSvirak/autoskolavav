import { Td, Tr } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { createTable, TableHeaderItem } from "../Table";

export type Price = {
  price: number;
  note: string;
};

export type Workshop = {
  name: string;
  prices: Price[];
  vehicles?: string[];
};

const Table = createTable<Workshop>();

export const renderVehicles = (vehicles?: string[]) =>
  vehicles && vehicles.join(", ");

export const WorkshopsTable: FunctionComponent<{
  workshops: Workshop[];
  title: string;
  headerItems: TableHeaderItem[];
}> = ({ workshops, title, headerItems }) => (
  <Table
    title={title}
    headerItems={headerItems}
    rows={workshops}
    renderRow={({ name, prices, vehicles }) =>
      prices.length == 0 ? (
        <Tr>
          <Td>{name}</Td>
          <Td />
          <Td>{renderVehicles(vehicles)}</Td>
        </Tr>
      ) : (
        prices.map((price, index) => (
          <Tr key={index}>
            <Td>{index == 0 && name}</Td>
            <Td>
              {price.price} Kč{price.note && <>, {price.note} </>}
            </Td>
            <Td>{index == 0 && renderVehicles(vehicles)}</Td>
          </Tr>
        ))
      )
    }
  />
);
