import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { Container, Heading, Link, Stack } from "@chakra-ui/react";
import { Article } from "../../models/article";
import { ContentHead } from "../../components/contentHead";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import ArticleHtmlParser from "../../components/ArticleHtmlParser";

type QuickCoursesProps = {
  readonly articleHtml: string;
};

const QuickCourses: NextPage<QuickCoursesProps> = ({ articleHtml }) => {
  console.log(articleHtml);
  return (
    <Container>
      <ContentHead pageName="Rychlokurzy" />
      <Stack>
        <Heading as="h1" size="lg">
          Rychlokurzy
        </Heading>
        <ArticleHtmlParser html={articleHtml} />
      </Stack>
    </Container>
  );
};

export default QuickCourses;

export const getServerSideProps: GetServerSideProps<QuickCoursesProps> = async () => {
  const article = await deliveryClient
    .item<Article>("quick_courses")
    .queryConfig({
      urlSlugResolver: (link, _context) => {
        return { url: link.urlSlug };
      },
    })
    .toPromise();

  return {
    props: {
      articleHtml: article.item.text.resolveHtml(),
    },
  };
};
