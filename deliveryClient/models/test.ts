import { ContentItem, Elements } from "@kentico/kontent-delivery";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Test extends ContentItem {
  public name: Elements.TextElement;
  public wholeName: Elements.TextElement;
  public note: Elements.TextElement;
  public price: Elements.NumberElement;
  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        if (elementName === "whole_name") {
          return "wholeName";
        }
        return elementName;
      },
    });
  }
}