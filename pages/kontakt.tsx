import { NextPage } from "next";
import { Box, Image, Stack } from "@chakra-ui/react";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Contact as ContactModel } from "../deliveryClient/models/contact";
import { PhoneNumber as PhoneNumberModel } from "../deliveryClient/models/phone_number";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { InferCreatorStaticPropsType } from "../utilities/inferCreatorPropsType";
import React from "react";
import { StackedContentWithHeading } from "../components/layout/stackedContentWithHeading";
import { Heading, HeadingSize, HeadingType } from "../components/Heading";
import { Text, TextType } from "../components/Text";

export const getStaticProps = catchEmAllStatic(async () => {
  const contactItem = await deliveryClient
    .item<ContactModel>("contact")
    .toPromise();

  const phoneNumbers = contactItem.data.item.elements.phone.linkedItemCodenames.map(
    (codename) =>
      (contactItem.data.linkedItems[codename] as PhoneNumberModel).elements.number.value
  );

  return {
    props: {
      street: contactItem.data.item.elements.street.value,
      streetNumber: contactItem.data.item.elements.street_number.value,
      city: contactItem.data.item.elements.city.value,
      zipCode: contactItem.data.item.elements.zip_code.value,
      addressNote: contactItem.data.item.elements.address___note.value,
      phoneNumbers,
      eMail: contactItem.data.item.elements.e_mail.value,
      officeHours: contactItem.data.item.elements.office_hours.value,
      officeHoursNote: contactItem.data.item.elements.office_hours___note.value,
      mapAssetLink: contactItem.data.item.elements.map.value[0].url,
      mapLink: contactItem.data.item.elements.map_link.value,
    },
  };
});

const renderPhoneNumbers = (phoneNumbers: string[]) =>
  phoneNumbers.map((number) => (
    <Text key={number} type={TextType.BodyOfText}>
      {number}
    </Text>
  ));

const renderNote = (addressNote: string) => (
  <Box mt={4}>
    {addressNote.split("\n").map((note) => (
      <Text key={note} type={TextType.BodyOfText}>
        {note}
      </Text>
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
}) => {
  const spacing = 2;
  return (
    <StackedContentWithHeading pageName="Kontakt">
      <Stack spacing={spacing}>
        <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
          Adresa
        </Heading>
        <Box>
          <Text type={TextType.BodyOfText}>
            {street} {streetNumber}
          </Text>
          <Text type={TextType.BodyOfText}>
            {city}, {zipCode}
          </Text>
        </Box>
        {renderNote(addressNote)}
      </Stack>
      <Stack spacing={spacing}>
        <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
          Telefon
        </Heading>
        {renderPhoneNumbers(phoneNumbers)}
      </Stack>
      <Stack spacing={spacing}>
        <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
          E-mail
        </Heading>
        <Text type={TextType.BodyOfText}>{eMail}</Text>
      </Stack>
      <Stack spacing={spacing}>
        <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
          ????edn?? hodiny
        </Heading>
        <Text type={TextType.BodyOfText}>{officeHours}</Text>
        {renderNote(officeHoursNote)}
      </Stack>
      <Stack spacing={spacing}>
        <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
          Mapa
        </Heading>
        <a href={mapLink} target="_blank">
          <Image src={mapAssetLink} />
        </a>
      </Stack>
    </StackedContentWithHeading>
  );
};

export default Contact;
