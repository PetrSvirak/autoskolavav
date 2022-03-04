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

  const workshopsVehiclesMap = createWorkshopsVehiclesMap(allVehicles.data.items);

  const workshops = getWorkshops(
    classicWorkshops.data,
    workshopsVehiclesMap,
    (workshop) => workshop.elements.name.value
  );

  const vehiclesWithPrice = allVehicles.data.items
    .filter((vehicle) => vehicle.elements.price_for_90_minutes.value !== null)
    .map(
      (vehicle): VehicleRidePrice => ({
        vehicleName: vehicle.elements.name.value,
        price: vehicle.elements.price_for_90_minutes.value,
      })
    );

  const tests = priceList.data.item.elements.tests.linkedItemCodenames
    .map((c) => priceList.data.linkedItems[c] as TestModel)
    .filter((x) => x !== undefined)
    .map(
      (item): Test => ({
        name: item.elements.name.value,
        note: item.elements.note.value,
        wholeName: item.elements.whole_name.value,
        price: item.elements.price.value,
      })
    );

  return {
    props: {
      priceForDowntime: priceList.data.item.elements.price_for_downtime.value,
      workshopsTitle: priceList.data.item.elements.workshops_title.value,
      anotherRidesTitle: priceList.data.item.elements.another_rides_title.value,
      testsTitle: priceList.data.item.elements.tests_title.value,
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
