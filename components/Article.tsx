import React from "react";
import { NextPage } from "next";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { ContentHead } from "./contentHead";
import ArticleHtmlParser from "./ArticleHtmlParser";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Article as ArticleModel } from "../models/article";

type ArticleProps = {
  readonly articleHtml: string;
  readonly pageName: string;
};

export const Article: NextPage<ArticleProps> = ({ articleHtml, pageName }) => {
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

export default ArticleProps;

export const createServerSideProps = (
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
