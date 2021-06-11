import { NextPage } from "next";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { PriceList as PriceListModel } from "../../deliveryClient/models/price_list";
import { Workshop as WorkshopModel } from "../../deliveryClient/models/workshop";
import { ContentHead } from "../../components/contentHead";
import { WorkshopsTable } from "../../components/classicPriceList/WorkshopsTable";
import { Vehicle } from "../../deliveryClient/models/vehicle";
import {
  createWorkshopsVehiclesMap,
  getWorkshops,
} from "../../utilities/priceListUtils";
import { TableHeaderItem } from "../../components/Table";

export const getStaticProps = catchEmAllStatic(async () => {
  const priceList = await deliveryClient
    .item<PriceListModel>("professional_price_list")
    .toPromise();

  const professionalWorkshops = await deliveryClient
    .items<WorkshopModel>()
    .type("workshop")
    .anyFilter("elements.type", ["professional"])
    .toPromise();

  const allVehicles = await deliveryClient
    .items<Vehicle>()
    .type("vehicle")
    .toPromise();

  const workshopsVehiclesMap = createWorkshopsVehiclesMap(allVehicles.items);

  const workshops = getWorkshops(
    professionalWorkshops,
    workshopsVehiclesMap,
    (workshop) =>
      workshop.name.value + " " + workshop.numberOfHours.value + " hodin"
  );

  return {
    props: {
      workshopsTitle: priceList.item.workshopsTitle.value,
      workshops,
    },
  };
});

const workshopsHeaderItems: TableHeaderItem[] = [
  { name: "Druh kurzu" },
  { name: "Cena" },
  { name: "Vozidlo" },
];

const ProfessionalPriceList: NextPage<
  InferCreatorStaticPropsType<typeof getStaticProps>
> = ({ workshopsTitle, workshops }) => (
  <Container padding="4">
    <ContentHead pageName="Ceník profesních kurzů" />
    <Stack spacing={8}>
      <Heading as="h1" size="lg">
        Ceník profesních kurzů
      </Heading>
      <WorkshopsTable
        headerItems={workshopsHeaderItems}
        title={workshopsTitle}
        workshops={workshops}
      />
    </Stack>
  </Container>
);

export default ProfessionalPriceList;
