import { Article, createGetArticleProps } from "../../components/article";

export default Article;

export const getStaticProps = createGetArticleProps(
  "professional_workshop___about",
  "Popis"
);
