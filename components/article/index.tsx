import { NextPage } from "next";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { ContentHead } from "../contentHead";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { Article as ArticleModel } from "../../models/article";
import { ArticleHtmlParser } from "./articleHtmlParser";
import { InferCreatorStaticPropsType } from "../inferCreatorPropsType";

export const createGetArticleProps = (
  codename: string,
  pageName: string
) => async () => {
  const article = await deliveryClient
    .item<ArticleModel>(codename)
    .queryConfig({
      urlSlugResolver: (link, _context) => {
        return { url: link.urlSlug };
      },
    })
    .toPromise();

  return {
    props: {
      pageName,
      articleHtml: article.item.text.resolveHtml(),
    },
  };
};

export const Article: NextPage<
  InferCreatorStaticPropsType<typeof createGetArticleProps>
> = ({ articleHtml, pageName }) => {
  console.log(articleHtml);
  return (
    <Container>
      <ContentHead pageName={pageName} />
      <Stack>
        <Heading as="h1" size="lg">
          {pageName}
        </Heading>
        <ArticleHtmlParser html={articleHtml} />
      </Stack>
    </Container>
  );
};
