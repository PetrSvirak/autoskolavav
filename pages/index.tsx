import { ContentHead } from "../components/contentHead";
import {
  Box,
  Button,
  Container,
  IconButton,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Action } from "../deliveryClient/models/action";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { InferGetStaticPropsType, NextPage } from "next";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { Actions } from "../components/index/actions";
import { News } from "../components/index/news";
import { Link } from "../deliveryClient/models/link";
import { News as NewsModel } from "../deliveryClient/models/news";
import { IContentItemsContainer } from "@kentico/kontent-delivery";
import { HomepagePhoto } from "../deliveryClient/models/homepage_photo";
import React, { FunctionComponent } from "react";
import { Heading, HeadingSize, HeadingType } from "../components/Heading";
import NextLink from "next/link";
import { Contact as ContactModel } from "../deliveryClient/models/contact";
import { PhoneNumber as PhoneNumberModel } from "../deliveryClient/models/phone_number";
import { ArrowDownIcon } from "@chakra-ui/icons";

type ContactDetail = {
  phoneNumbers: string[];
  eMail: string;
  officeHours: string;
  officeHoursNote: string;
  mapAssetLink: string;
  mapLink: string;
};

const mapActionToActionViewType =
  (linkedItems: IContentItemsContainer) =>
  (action: Action): ActionViewType => ({
    text: [
      action.elements.line1.value,
      action.elements.line2.value,
      action.elements.line3.value,
    ],
    moreInfoLink: action.elements.more_info_link?.linkedItemCodenames.map(
      (c) => {
        const link = linkedItems[c] as Link;
        if (link) {
          return link.elements.link.value;
        }
      }
    )[0],
  });

const mapNewsToNewsViewType = (action: NewsModel): NewsViewType => ({
  text: action.elements.text.value,
});

export const getStaticProps = catchEmAllStatic(async () => {
  const actionsResult = await deliveryClient
    .items<Action>()
    .type("action")
    .orderByDescending("system.last_modified")
    .toPromise();

  const homepagePhoto = await deliveryClient
    .item<HomepagePhoto>("uvodni_foto")
    .toPromise();

  const newsResult = await deliveryClient
    .items<NewsModel>()
    .type("news")
    .orderByDescending("system.last_modified")
    .toPromise();

  const actions = actionsResult?.data.items
    .slice(0, 5)
    .map<ActionViewType>(
      mapActionToActionViewType(actionsResult.data.linkedItems)
    );

  const news = newsResult?.data.items
    .slice(0, 3)
    .map<NewsViewType>(mapNewsToNewsViewType);

  const contactItem = await deliveryClient
    .item<ContactModel>("contact")
    .toPromise();

  const phoneNumbers =
    contactItem.data.item.elements.phone.linkedItemCodenames.map(
      (codename) =>
        (contactItem.data.linkedItems[codename] as PhoneNumberModel).elements
          .number.value
    );

  const contact: ContactDetail = {
    phoneNumbers,
    eMail: contactItem.data.item.elements.e_mail.value,
    officeHours: contactItem.data.item.elements.office_hours.value,
    officeHoursNote: contactItem.data.item.elements.office_hours___note.value,
    mapAssetLink: contactItem.data.item.elements.map.value[0].url,
    mapLink: contactItem.data.item.elements.map_link.value,
  };

  return {
    props: {
      actions,
      news,
      homepagePhotoUrl: homepagePhoto.data.item.elements.photo.value[0].url,
      contact,
    },
  };
});

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  actions,
  news,
  homepagePhotoUrl,
  contact,
}) => {
  const scrollToBasicInformation = () => {
    const element = document.getElementById("basicInformationElementId");
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box
        m={0}
        py={10}
        px="10%"
        bgImage={`url('${homepagePhotoUrl}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="full"
        w="full"
      >
        <ContentHead pageName="Akční nabídka" />
        <Stack
          h="full"
          justifyContent="space-between"
          direction={{ base: "column", md: "column" }}
        >
          <Stack spacing={12} direction={{ base: "column", md: "column" }}>
            <Actions actions={actions} />
            <News news={news} />
          </Stack>
          <Box>
            <Box margin="0 auto" w="min-content">
              <IconButton
                size="lg"
                aria-label="down"
                icon={<ArrowDownIcon w={8} h={8} />}
                onClick={scrollToBasicInformation}
                width="min-content"
                border="none"
                borderRadius="3xl"
              />
            </Box>
          </Box>
        </Stack>
      </Box>
      <BasicInformation contact={contact} />
    </>
  );
};

const BasicInformation: FunctionComponent<{ contact: ContactDetail }> = ({
  contact,
}) => (
  <Box
    id="basicInformationElementId"
    position="absolute"
    top="100vh"
    width="100%"
    px="10%"
    py={12}
  >
    <Stack spacing={8}>
      <CourseInformation
        headline="Základní informace o kurzu skupiny B"
        link="/klasicke/kurzy"
        linkText="Zobrazit klasické kurzy"
      />
      <CourseInformation
        headline="Profesní školení"
        link="/profesni/kurzy"
        linkText="Zobrazit profesní školení"
      />
      <Contact {...contact} />
    </Stack>
  </Box>
);

const CourseInformation: FunctionComponent<{
  headline: string;
  link: string;
  linkText: string;
}> = ({ headline, link, linkText }) => (
  <>
    <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
      {headline}
    </Heading>
    <Button w="min-content">
      <NextLink href={link}>{linkText}</NextLink>
    </Button>
  </>
);

const Contact: FunctionComponent<ContactDetail> = ({
  eMail,
  officeHours,
  officeHoursNote,
  mapAssetLink,
  mapLink,
  phoneNumbers,
}) => (
  <>
    <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
      Kontakty
    </Heading>
    <Stack direction={{ base: "column", md: "row" }} spacing={12}>
      <Stack spacing={5}>
        <div>
          <Container textStyle="contact-detail-heading" p={0} m={0}>
            Telefon
          </Container>
          <div>{phoneNumbers.join(", ")}</div>
        </div>
        <div>
          <Container textStyle="contact-detail-heading" p={0} m={0}>
            E-mail
          </Container>
          <div>{eMail}</div>
        </div>
        <div>
          <Container textStyle="contact-detail-heading" p={0} m={0}>
            Úřední hodiny
          </Container>
          <div>{officeHours}</div>
          <div>{officeHoursNote}</div>
        </div>
      </Stack>
      <a href={mapLink} target="_blank">
        <Image src={`${mapAssetLink}`} height="270px" />
      </a>
    </Stack>
  </>
);

export default Index;
