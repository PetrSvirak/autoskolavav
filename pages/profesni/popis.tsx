import React from "react";
import { Article, createServerSideProps } from "../../components/Article";

export default Article;

export const getServerSideProps = createServerSideProps(
  "professional_workshop___about",
  "Popis"
);
