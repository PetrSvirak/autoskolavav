import { NextPage } from "next";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { PriceList as PriceListModel } from "../../deliveryClient/models/price_list";
import { Workshop as WorkshopModel } from "../../deliveryClient/models/workshop";
import { Test as TestModel } from "../../deliveryClient/models/test";
import { WorkshopsTable } from "../../components/classicPriceList/WorkshopsTable";
import {
  VehicleRidePrice,
  RidesTable,
} from "../../components/classicPriceList/RidesTable";
import { Test, TestsTable } from "../../components/classicPriceList/TestsTable";
import { Vehicle } from "../../deliveryClient/models/vehicle";
import {
  createWorkshopsVehiclesMap,
  getWorkshops,
} from "../../utilities/priceListUtils";
import { TableHeaderItem } from "../../components/Table";
import { StackedContentWithHeading } from "../../components/layout/stackedContentWithHeading";

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

  const workshops = getWorkshops(
    classicWorkshops,
    workshopsVehiclesMap,
    (workshop) => workshop.name.value
  );

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

const workshopsHeaderItems: TableHeaderItem[] = [
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
  <StackedContentWithHeading pageName="Ceník klasických kurzů">
    <WorkshopsTable
      headerItems={workshopsHeaderItems}
      title={workshopsTitle}
      workshops={workshops}
    />
    <RidesTable
      title={anotherRidesTitle}
      rides={vehiclesWithPrice}
      priceForDowntime={priceForDowntime}
    />
    <TestsTable title={testsTitle} tests={tests} />
  </StackedContentWithHeading>
);

export default ClassicPriceList;
