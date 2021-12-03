import { Link, Td, Tr } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { createTable, TableHeaderItem } from "../Table";
import NextLink from "next/link";
import { Text, TextType } from "../Text";

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

const renderVehicles = (vehicles?: string[]) =>
  vehicles &&
  vehicles.map((vehicle) => (
    <Text type={TextType.Inline}>
      <NextLink key={vehicle} href="/fotogalerie" passHref>
        <Link>{vehicle}</Link>
      </NextLink>
    </Text>
  ));

const hasAnyPrices = (workshop: Workshop) => workshop.prices.length != 0;

const shouldRenderProp = (rowIndex: number) => rowIndex == 0;

const renderWorkshopWithPrices = ({ prices, name, vehicles }: Workshop) =>
  prices.map((price, index) => (
    <Tr key={index}>
      <Td>{shouldRenderProp(index) && name}</Td>
      <Td>
        {price.price} Kč{price.note && <>, {price.note} </>}
      </Td>
      <Td>{shouldRenderProp(index) && renderVehicles(vehicles)}</Td>
    </Tr>
  ));

const renderWorkshopWithoutPrices = ({ name, vehicles }: Workshop) => (
  <Tr>
    <Td>{name}</Td>
    <Td>-</Td>
    <Td>{renderVehicles(vehicles)}</Td>
  </Tr>
);

export const WorkshopsTable: FunctionComponent<{
  workshops: Workshop[];
  title: string;
  headerItems: TableHeaderItem[];
}> = ({ workshops, title, headerItems }) => (
  <Table
    title={title}
    headerItems={headerItems}
    rows={workshops}
    renderRow={(workshop) =>
      hasAnyPrices(workshop)
        ? renderWorkshopWithPrices(workshop)
        : renderWorkshopWithoutPrices(workshop)
    }
  />
);
