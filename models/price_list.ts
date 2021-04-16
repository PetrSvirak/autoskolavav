import { ContentItem, Elements } from "@kentico/kontent-delivery";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class PriceList extends ContentItem {
  public priceForDowntime: Elements.NumberElement;
  public testsTitle: Elements.TextElement;
  public workshopsTitle: Elements.TextElement;
  public anotherRidesTitle: Elements.TextElement;
  public untitledRichText: Elements.RichTextElement;
  public workshopType: Elements.MultipleChoiceElement;
  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        if (elementName === "price_for_downtime") {
          return "priceForDowntime";
        }
        if (elementName === "tests_title") {
          return "testsTitle";
        }
        if (elementName === "workshops_title") {
          return "workshopsTitle";
        }
        if (elementName === "another_rides_title") {
          return "anotherRidesTitle";
        }
        if (elementName === "untitled_rich_text") {
          return "untitledRichText";
        }
        if (elementName === "workshop_type") {
          return "workshopType";
        }
        return elementName;
      },
    });
  }
}
