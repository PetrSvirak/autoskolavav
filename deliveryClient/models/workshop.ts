import { ContentItem, Elements } from "@kentico/kontent-delivery";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Workshop extends ContentItem {
  public name: Elements.TextElement;
  public numberOfHours: Elements.NumberElement;
  public type: Elements.MultipleChoiceElement;
  public price: Elements.RichTextElement;
  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        if (elementName === "number_of_hours") {
          return "numberOfHours";
        }
        if (elementName === "type") {
          return "type";
        }
        if (elementName === "price") {
          return "price";
        }
        return elementName;
      },
    });
  }
}
