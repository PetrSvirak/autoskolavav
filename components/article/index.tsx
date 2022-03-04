import { NextPage } from "next";
import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { Text as TextModel } from "../../deliveryClient/models/text";
import { ArticleHtmlParser } from "./articleHtmlParser";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { StackedContentWithHeading } from "../layout/stackedContentWithHeading";
import {createRichTextHtmlResolver, linkedItemsHelper} from "@kentico/kontent-delivery";
import {useEffect, useState} from "react";

export const createGetArticleProps = (codename: string, pageName: string) =>
  catchEmAllStatic(async () => {
    const article = await deliveryClient
      .item<TextModel>(codename)
      .toPromise();

    return {
      props: {
        pageName,
        articleTextElement: article.data.item.elements.text,
        articleLinkedItems: article.data.linkedItems,
      },
    };
  });

export const Article: NextPage<
  InferCreatorStaticPropsType<typeof createGetArticleProps>
> = ({ articleLinkedItems, articleTextElement, pageName }) => {
    const [html, setHtml] = useState<string>(null);

    useEffect(
        () => {
            // this code belongs to the createGetArticleProps, however, current Delivery SDK uses browser API to parse HTML
            // in all RichText*Resolver instances and thus cannot be used on the node server side.
            const resolverResult = createRichTextHtmlResolver().resolveRichText({
                element: articleTextElement,
                linkedItems: linkedItemsHelper.convertLinkedItemsToArray(articleLinkedItems),
                urlResolver: (linkId, linkText, link) => ({
                    linkUrl: link.urlSlug,
                }),
            });

            setHtml(resolverResult.html);
        },
        [articleLinkedItems, articleTextElement, setHtml]);

    return (
        <StackedContentWithHeading pageName={pageName}>
            <ArticleHtmlParser html={html}/>
        </StackedContentWithHeading>
    );
};
