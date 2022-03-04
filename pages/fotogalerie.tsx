import React from "react";
import { InferGetStaticPropsType, NextPage } from "next";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Vehicle } from "../deliveryClient/models/vehicle";
import { Box, Image, SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react";
import { Gallery } from "../deliveryClient/models/gallery";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { ModalWindow } from "../components/ModalWindow";
import { Heading, HeadingType, HeadingSize } from "../components/Heading";
import { StackedContentWithHeading } from "../components/layout/stackedContentWithHeading";
import {ElementModels} from "@kentico/kontent-delivery";

type PhotoGalleryViewModel = {
  readonly photoSrc: string;
  readonly name: string;
  readonly typeCodeName: string;
  readonly typeName: string;
};

const convertVehicleToPhotoGalleryViewModel = (
  vehicle: Vehicle
): PhotoGalleryViewModel => ({
  name: vehicle.elements.name.value,
  photoSrc: vehicle.elements.photo.value[0].url,
  typeCodeName: vehicle.elements.type.value[0].codename,
  typeName: vehicle.elements.type.value[0].name,
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
  const vehicles = vehiclesResult.data.items
    .filter((item) => item.elements.photo.value[0])
    .map(convertVehicleToPhotoGalleryViewModel);

  const otherPhotosResult = await deliveryClient
    .item<Gallery>("gallery")
    .toPromise();
  const others = otherPhotosResult.data.item.elements.another_gallery_pictures.value.map(
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
  const [
    selectedImage,
    setSelectedImage,
  ] = React.useState<PhotoGalleryViewModel>(null);
  const close = () => {
    onClose();
    setSelectedImage(null);
  };
  const open = (image: PhotoGalleryViewModel) => {
    onOpen();
    setSelectedImage(image);
  };
  return (
    <StackedContentWithHeading pageName="Fotogalerie">
      <ModalWindow
        isOpened={selectedImage && isOpen}
        onClose={close}
        title={selectedImage?.name}
      >
        <Image
          src={`${selectedImage?.photoSrc}?w=1200&h=800`}
          width="1200px"
          height="800px"
        />
      </ModalWindow>
      <Stack spacing={8}>
        {photosByType.map(([typeCodeName, photos]) => (
          <Stack as="section" key={typeCodeName} spacing={4}>
            {photos[0]?.typeName && (
              <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
                {photos[0]?.typeName}
              </Heading>
            )}
            <SimpleGrid columns={[1, null, 4]} gap={5}>
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
                      open(viewModel);
                    }}
                  >
                    <Image
                      boxSize="100%"
                      title={viewModel.name}
                      src={photoSrc232w}
                      objectFit="cover"
                      srcSet={`${photoSrc600w} 600w, ${photoSrc232w} 232w`}
                      sizes="(max-width: 767px) 600px, 232px"
                    />
                  </Box>
                );
              })}
            </SimpleGrid>
          </Stack>
        ))}
      </Stack>
    </StackedContentWithHeading>
  );
};

export default PhotoGallery;
