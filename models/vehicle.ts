import { ContentItem, Elements } from "@kentico/kontent-delivery";
import { Workshop } from "./workshop";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Vehicle extends ContentItem {
  public name: Elements.TextElement;
  public photo: Elements.AssetsElement;
  public workshops: Elements.LinkedItemsElement<Workshop>;
  public priceFor90Minutes: Elements.NumberElement;
  public type: Elements.MultipleChoiceElement;
  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        if (elementName === "price_for_90_minutes") {
          return "priceFor90Minutes";
        }
        return elementName;
      },
    });
  }
}
