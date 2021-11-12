import { NextPage } from "next";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Contact as ContactModel } from "../deliveryClient/models/contact";
import { PhoneNumber as PhoneNumberModel } from "../deliveryClient/models/phone_number";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { InferCreatorStaticPropsType } from "../utilities/inferCreatorPropsType";
import React from "react";
import { StackedContentWithHeading } from "../components/layout/stackedContentWithHeading";
import { Heading, HeadingType, Size } from "../components/Heading";

export const getStaticProps = catchEmAllStatic(async () => {
  const contactItem = await deliveryClient
    .item<ContactModel>("contact")
    .toPromise();

  const phoneNumbers = contactItem.item.phone.linkedItemCodenames.map(
    (codename) =>
      (contactItem.linkedItems[codename] as PhoneNumberModel).number.value
  );

  return {
    props: {
      street: contactItem.item.street.value,
      streetNumber: contactItem.item.streetNumber.value,
      city: contactItem.item.city.value,
      zipCode: contactItem.item.zipCode.value,
      addressNote: contactItem.item.addressNote.value,
      phoneNumbers,
      eMail: contactItem.item.eMail.value,
      officeHours: contactItem.item.officeHours.value,
      officeHoursNote: contactItem.item.officeHoursNote.value,
      mapAssetLink: contactItem.item.map.value[0].url,
      mapLink: contactItem.item.mapLink.value,
    },
  };
});

const renderPhoneNumbers = (phoneNumbers: string[]) =>
  phoneNumbers.map((number) => <Text key={number}>{number}</Text>);

const renderNote = (addressNote: string) => (
  <Box mt={4}>
    {addressNote.split("\n").map((note) => (
      <Text key={note}>{note}</Text>
    ))}
  </Box>
);

const Contact: NextPage<InferCreatorStaticPropsType<typeof getStaticProps>> = ({
  street,
  streetNumber,
  city,
  zipCode,
  addressNote,
  phoneNumbers,
  eMail,
  officeHours,
  officeHoursNote,
  mapAssetLink,
  mapLink,
}) => (
  <StackedContentWithHeading pageName="Kontakt">
    <Stack spacing={4}>
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        Adresa
      </Heading>
      <Box>
        <Text>
          {street} {streetNumber}
        </Text>
        <Text>
          {city}, {zipCode}
        </Text>
      </Box>
      {renderNote(addressNote)}
    </Stack>
    <Stack spacing={4}>
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        Telefon
      </Heading>
      {renderPhoneNumbers(phoneNumbers)}
    </Stack>
    <Stack spacing={4}>
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        E-mail
      </Heading>
      <Text>{eMail}</Text>
    </Stack>
    <Stack spacing={4}>
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        Úřední hodiny
      </Heading>
      <Text>{officeHours}</Text>
      {renderNote(officeHoursNote)}
    </Stack>
    <Stack spacing={4}>
      <Heading size={Size.H2} type={HeadingType.Secondary}>
        Mapa
      </Heading>
      <a href={mapLink} target="_blank">
        <Image src={mapAssetLink} />
      </a>
    </Stack>
  </StackedContentWithHeading>
);

export default Contact;
