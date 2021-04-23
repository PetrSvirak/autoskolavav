import React from "react";
import { ContentHead } from "../components/contentHead";
import { InferGetStaticPropsType, NextPage } from "next";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Vehicle } from "../deliveryClient/models/vehicle";
import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { Gallery } from "../deliveryClient/models/gallery";
import { ElementModels } from "@kentico/kontent-delivery/_commonjs/elements/element-models";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { ModalWindow } from "./Modal";

type PhotoGalleryViewModel = {
  readonly photoSrc: string;
  readonly name: string;
  readonly typeCodeName: string;
  readonly typeName: string;
};

const convertVehicleToPhotoGalleryViewModel = (
  vehicle: Vehicle
): PhotoGalleryViewModel => ({
  name: vehicle.name.value,
  photoSrc: vehicle.photo.value[0].url,
  typeCodeName: vehicle.type.value[0].codename,
  typeName: vehicle.type.value[0].name,
});

const convertOtherToPhotoGalleryViewModel = (
  asset: ElementModels.AssetModel
): PhotoGalleryViewModel => ({
  name: asset.description,
  photoSrc: asset.url,
  typeCodeName: "z_last",
  typeName: "Ostatní",
});

export const getStaticProps = catchEmAllStatic(async () => {
  const vehiclesResult = await deliveryClient
    .items<Vehicle>()
    .type("vehicle")
    .toPromise();
  const vehicles = vehiclesResult.items
    .filter((item) => item.photo.value[0])
    .map(convertVehicleToPhotoGalleryViewModel);

  const otherPhotosResult = await deliveryClient
    .item<Gallery>("gallery")
    .toPromise();
  const others = otherPhotosResult.item.anotherGalleryPictures.value.map(
    convertOtherToPhotoGalleryViewModel
  );

  const photos = [...vehicles, ...others]
    .reduce<Map<string, readonly PhotoGalleryViewModel[]>>(
      (accumulator, current) =>
        accumulator.has(current.typeCodeName)
          ? accumulator.set(current.typeCodeName, [
              ...accumulator.get(current.typeCodeName),
              current,
            ])
          : accumulator.set(current.typeCodeName, [current]),
      new Map<string, readonly PhotoGalleryViewModel[]>()
    )
    .entries();

  const photosByType = Array.from(photos);
  photosByType.sort((a, b) => a[0].localeCompare(b[0]));

  return {
    props: {
      photosByType,
    },
  };
});

const PhotoGallery: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ photosByType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSrc, setSelectedSrc] = React.useState("");
  const close = () => {
    onClose();
    setSelectedSrc("");
  };
  const open = (src: string) => {
    onOpen();
    setSelectedSrc(src);
  };
  return (
    <>
      <ModalWindow isOpened={selectedSrc && isOpen} onClose={close}>
        <Image src={`${selectedSrc}?w=1200&h=800`} />
      </ModalWindow>
      <Container>
        <ContentHead pageName="Fotogalerie" />
        <Stack>
          <Heading as="h1" size="lg">
            Fotogalerie
          </Heading>
          <Stack spacing={4}>
            {photosByType.map(([typeCodeName, photos]) => (
              <Stack
                as="section"
                key={typeCodeName}
                borderWidth={1}
                padding={4}
                rounded="md"
              >
                {photos[0]?.typeName && (
                  <Heading as="h2" size="md">
                    {photos[0]?.typeName}
                  </Heading>
                )}
                <SimpleGrid columns={[1, null, 2]} gap={5}>
                  {photos.map((viewModel) => {
                    const photoSrc232w = `${viewModel.photoSrc}?w=232&h=232`;
                    const photoSrc600w = `${viewModel.photoSrc}?w=600&h=400`;
                    return (
                      <Box
                        key={viewModel.name}
                        as="a"
                        href="#"
                        onClick={(e: any) => {
                          e.preventDefault();
                          open(viewModel.photoSrc);
                        }}
                      >
                        <Image
                          boxSize="100%"
                          src={photoSrc232w}
                          objectFit="cover"
                          srcSet={`${photoSrc600w} 600w, ${photoSrc232w} 232w`}
                          sizes="(max-width: 767px) 600px,
                                      232px"
                        />
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default PhotoGallery;
