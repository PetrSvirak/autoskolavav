import { ContentItem, Elements } from "@kentico/kontent-delivery";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Link extends ContentItem {
  public link: Elements.TextElement;
  public urlSlug: Elements.TextElement;

  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        if (elementName === "url_slug") {
          return "urlSlug";
        }
        return elementName;
      },
    });
  }
}
