import { NextPage } from "next";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { PriceList as PriceListModel } from "../../deliveryClient/models/price_list";
import { Workshop as WorkshopModel } from "../../deliveryClient/models/workshop";
import { ContentHead } from "../../components/contentHead";
import { Price as PriceModel } from "../../deliveryClient/models/price";
import {
  Price,
  Workshop,
  WorkshopsTable,
} from "../../components/classicPriceList/WorkshopsTable";
import { Vehicle } from "../../deliveryClient/models/vehicle";
import { createWorkshopsVehiclesMap } from "../../utilities/priceListUtils";
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

  const workshops = professionalWorkshops.items
    .map(
      (workshop): Workshop => {
        const prices = workshop.price.linkedItemCodenames
          .map((c) => professionalWorkshops.linkedItems[c] as PriceModel)
          .map(
            (price): Price => ({
              price: price.price.value,
              note: price.note.value,
            })
          );
        return {
          name:
            workshop.name.value + " " + workshop.numberOfHours.value + " hodin",
          prices,
          vehicles: workshopsVehiclesMap.get(workshop.system.id) || null,
        };
      }
    )
    .filter((x) => x !== undefined);

  return {
    props: {
      workshopsTitle: priceList.item.workshopsTitle.value,
      workshops,
    },
  };
});

const headerItems: TableHeaderItem[] = [
  { name: "Druh kurzu" },
  { name: "Cena" },
  { name: "Vozidlo" },
];

const ProfessionalPriceList: NextPage<
  InferCreatorStaticPropsType<typeof getStaticProps>
> = ({ workshopsTitle, workshops }) => (
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
    </Stack>
  </Container>
);

export default ProfessionalPriceList;
