import { ContentHead } from "../components/contentHead";
import { Box, Stack } from "@chakra-ui/react";
import { Action } from "../deliveryClient/models/action";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { InferGetStaticPropsType, NextPage } from "next";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { Actions } from "../components/index/actions";
import { News } from "../components/index/news";
import { Link } from "../deliveryClient/models/link";
import { IContentItemsContainer } from "@kentico/kontent-delivery";
import { HomepagePhoto } from "../deliveryClient/models/homepage_photo";

const mapActionToActionViewType = (linkedItems: IContentItemsContainer) => (
  action: Action
): ActionViewType => ({
  note: action.note.value,
  subtitle: action.subtitle.value,
  title: action.title.value,
  moreInfoLink: action.moreInfoLink?.linkedItemCodenames.map((c) => {
    const link = linkedItems[c] as Link;
    if (link) {
      return link.link.value;
    }
  })[0],
});

const mapActionToNewsViewType = (action: Action): NewsViewType => ({
  note: action.note.value,
  subtitle: action.subtitle.value,
  title: action.title.value,
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

  const actions = actionsResult?.items
    .filter((action) => action.type.value[0]?.codename === "important")
    .map<ActionViewType>(mapActionToActionViewType(actionsResult.linkedItems));

  const news = actionsResult?.items
    .filter((action) => action.type.value[0]?.codename === "informational")
    .map<NewsViewType>(mapActionToNewsViewType);

  return {
    props: {
      actions,
      news,
      homepagePhotoUrl: homepagePhoto.item.photo.value[0].url,
    },
  };
});

const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  actions,
  news,
  homepagePhotoUrl,
}) => (
  <Box
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
    <Stack spacing={12} direction={{ base: "column", md: "column" }}>
      <Actions actions={actions} />
      <News news={news} />
    </Stack>
  </Box>
);

export default Index;
