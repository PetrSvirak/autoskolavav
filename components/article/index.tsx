import { NextPage } from "next";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { Article as ArticleModel } from "../../deliveryClient/models/article";
import { ArticleHtmlParser } from "./articleHtmlParser";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { StackedContentWithHeading } from "../layout/stackedContentWithHeading";

export const createGetArticleProps = (codename: string, pageName: string) =>
  catchEmAllStatic(async () => {
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
  });

export const Article: NextPage<
  InferCreatorStaticPropsType<typeof createGetArticleProps>
> = ({ articleHtml, pageName }) => (
  <StackedContentWithHeading pageName={pageName}>
    <ArticleHtmlParser html={articleHtml} />
  </StackedContentWithHeading>
);
