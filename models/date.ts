import { ContentItem, Elements } from "@kentico/kontent-delivery";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Date extends ContentItem {
  public freePlaces: Elements.NumberElement;
  public date: Elements.DateTimeElement;
  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        if (elementName === "free_places") {
          return "freePlaces";
        }
        return elementName;
      },
    });
  }
}
