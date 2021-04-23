import { Td, Tr } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { createTable, TableHeaderItem } from "../Table";

export type VehicleRidePrice = {
  vehicleName: string;
  price: number;
};

const Table = createTable<VehicleRidePrice>();

const headerItems: TableHeaderItem[] = [{ name: "Typ vozu" }, { name: "Cena" }];

export const RidesTable: FunctionComponent<{
  rides: VehicleRidePrice[];
  title: string;
  priceForDowntime: number;
}> = ({ rides, title, priceForDowntime }) => (
  <Table
    title={title}
    headerItems={headerItems}
    rows={rides}
    renderRow={({ vehicleName, price }) => (
      <Tr>
        <Td>{vehicleName}</Td>
        <Td>{price} Kč / 90 minut</Td>
      </Tr>
    )}
    additionalRow={
      <Tr>
        <Td>Prostoj za jízdu</Td>
        <Td>{priceForDowntime} Kč / 90 minut</Td>
      </Tr>
    }
  />
);
