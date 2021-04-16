import React from "react";
import { ContentHead } from "../components/contentHead";
import { GetStaticPropsResult, NextPage } from "next";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Vehicle } from "../models/vehicle";
import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

type PhotoGalleryProps = {
  readonly vehicleViewModels: readonly [
    string,
    readonly PhotoGalleryVehicleViewModel[]
  ][];
};

type PhotoGalleryVehicleViewModel = {
  readonly photoSrc: string;
  readonly name: string;
  readonly type: string;
};

const convertVehicleToPhotoGalleryViewModel = (
  vehicle: Vehicle
): PhotoGalleryVehicleViewModel => ({
  name: vehicle.name.value,
  photoSrc: vehicle.photo.value[0].url,
  type: vehicle.type.value[0].name,
});

const PhotoGallery: NextPage<PhotoGalleryProps> = ({ vehicleViewModels }) => (
  <Container>
    <ContentHead pageName="Fotogalerie" />
    <Stack>
      <Heading as="h1" size="lg">
        Fotogalerie
      </Heading>
      <Stack spacing={4}>
        {vehicleViewModels.map(([type, vehicles]) => (
          <Stack
            as="section"
            key={type}
            borderWidth={1}
            padding={4}
            rounded="md"
          >
            <Heading as="h2" size="md">
              {type}
            </Heading>
            <SimpleGrid columns={2} gap={5}>
              {vehicles.map((viewModel) => (
                <Box key={viewModel.name}>
                  <Image src={viewModel.photoSrc} />
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </Stack>
  </Container>
);

export default PhotoGallery;

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PhotoGalleryProps>
> {
  const data = await deliveryClient
    .items<Vehicle>()
    .type("vehicle")
    .toPromise();
  const photos = data.items
    .filter((item) => item.photo.value[0])
    .map(convertVehicleToPhotoGalleryViewModel)
    .reduce<Map<string, readonly PhotoGalleryVehicleViewModel[]>>(
      (accumulator, current) =>
        accumulator.has(current.type)
          ? accumulator.set(current.type, [
              ...accumulator.get(current.type),
              current,
            ])
          : accumulator.set(current.type, [current]),
      new Map<string, readonly PhotoGalleryVehicleViewModel[]>()
    );

  return {
    props: {
      vehicleViewModels: Array.from(photos.entries()),
    },
  };
}
