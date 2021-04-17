import { Article, createGetArticleProps } from "../../components/article";

export default Article;

export const getStaticProps = createGetArticleProps(
  "quick_courses",
  "Rychlokurzy"
);
