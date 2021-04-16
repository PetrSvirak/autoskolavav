import { ContentItem, Elements } from "@kentico/kontent-delivery";

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Term extends ContentItem {
  public heading: Elements.TextElement;
  public dates: Elements.RichTextElement;
  public note: Elements.TextElement;
  constructor() {
    super({
      propertyResolver: (elementName: string) => {
        return elementName;
      },
    });
  }
}
