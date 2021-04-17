import React from "react";
import {
  Article,
  createGetArticleProps,
} from "../../components/Article/Article";

export default Article;

export const getStaticProps = createGetArticleProps(
  "quick_courses",
  "Rychlokurzy"
);
