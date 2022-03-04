import { ContentHead } from "../components/contentHead";
import { Box, Stack } from "@chakra-ui/react";
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

const mapActionToActionViewType =
  (linkedItems: IContentItemsContainer) =>
  (action: Action): ActionViewType => ({
    text: [action.elements.line1.value, action.elements.line2.value, action.elements.line3.value],
    moreInfoLink: action.elements.more_info_link?.linkedItemCodenames.map((c) => {
      const link = linkedItems[c] as Link;
      if (link) {
        return link.elements.link.value;
      }
    })[0],
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
    .map<ActionViewType>(mapActionToActionViewType(actionsResult.data.linkedItems));

  const news = newsResult?.data.items
    .slice(0, 3)
    .map<NewsViewType>(mapNewsToNewsViewType);

  return {
    props: {
      actions,
      news,
      homepagePhotoUrl: homepagePhoto.data.item.elements.photo.value[0].url,
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
