import { Article, createGetArticleProps } from "../../components/article";

export default Article;

export const getStaticProps = createGetArticleProps(
  "classical_courses",
  "Klasické kurzy"
);
