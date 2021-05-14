import { NextPage } from "next";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { PriceList as PriceListModel } from "../../deliveryClient/models/price_list";
import { Workshop as WorkshopModel } from "../../deliveryClient/models/workshop";
import { ContentHead } from "../../components/contentHead";
import { Test as TestModel } from "../../deliveryClient/models/test";
import { Price as PriceModel } from "../../deliveryClient/models/price";
import {
  Price,
  Workshop,
  WorkshopsTable,
} from "../../components/classicPriceList/WorkshopsTable";
import {
  VehicleRidePrice,
  RidesTable,
} from "../../components/classicPriceList/RidesTable";
import { Test, TestsTable } from "../../components/classicPriceList/TestsTable";
import { Vehicle } from "../../deliveryClient/models/vehicle";
import { createWorkshopsVehiclesMap } from "../../utilities/priceListUtils";
import { TableHeaderItem } from "../../components/Table";

export const getStaticProps = catchEmAllStatic(async () => {
  const priceList = await deliveryClient
    .item<PriceListModel>("classic_price_list")
    .toPromise();

  const classicWorkshops = await deliveryClient
    .items<WorkshopModel>()
    .type("workshop")
    .anyFilter("elements.type", ["classic"])
    .toPromise();

  const allVehicles = await deliveryClient
    .items<Vehicle>()
    .type("vehicle")
    .toPromise();

  const workshopsVehiclesMap = createWorkshopsVehiclesMap(allVehicles.items);

  const workshops = classicWorkshops.items
    .map(
      (workshop): Workshop => {
        const prices = workshop.price.linkedItemCodenames
          .map((c) => classicWorkshops.linkedItems[c] as PriceModel)
          .map(
            (price): Price => ({
              price: price.price.value,
              note: price.note.value,
            })
          );
        return {
          name: workshop.name.value,
          prices,
          vehicles: workshopsVehiclesMap.get(workshop.system.id),
        };
      }
    )
    .filter((x) => x !== undefined);

  const vehiclesWithPrice = allVehicles.items
    .filter((vehicle) => vehicle.priceFor90Minutes.value !== null)
    .map(
      (vehicle): VehicleRidePrice => ({
        vehicleName: vehicle.name.value,
        price: vehicle.priceFor90Minutes.value,
      })
    );

  const tests = priceList.item.tests.linkedItemCodenames
    .map((c) => priceList.linkedItems[c] as TestModel)
    .filter((x) => x !== undefined)
    .map(
      (item): Test => ({
        name: item.name.value,
        note: item.note.value,
        wholeName: item.wholeName.value,
        price: item.price.value,
      })
    );

  return {
    props: {
      priceForDowntime: priceList.item.priceForDowntime.value,
      workshopsTitle: priceList.item.workshopsTitle.value,
      anotherRidesTitle: priceList.item.anotherRidesTitle.value,
      testsTitle: priceList.item.testsTitle.value,
      workshops,
      tests,
      vehiclesWithPrice,
    },
  };
});

const headerItems: TableHeaderItem[] = [
  { name: "Skupina" },
  { name: "Cena" },
  { name: "Vozidlo" },
];

const ClassicPriceList: NextPage<
  InferCreatorStaticPropsType<typeof getStaticProps>
> = ({
  workshopsTitle,
  anotherRidesTitle,
  testsTitle,
  workshops,
  tests,
  priceForDowntime,
  vehiclesWithPrice,
}) => (
  <Container>
    <ContentHead pageName="Ceník" />
    <Stack spacing={8}>
      <Heading as="h1" size="lg">
        Ceník
      </Heading>
      <WorkshopsTable
        headerItems={headerItems}
        title={workshopsTitle}
        workshops={workshops}
      />
      <RidesTable
        title={anotherRidesTitle}
        rides={vehiclesWithPrice}
        priceForDowntime={priceForDowntime}
      />
      <TestsTable title={testsTitle} tests={tests} />
    </Stack>
  </Container>
);

export default ClassicPriceList;