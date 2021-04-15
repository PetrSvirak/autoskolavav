
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Term extends ContentItem {
    public title: Elements.TextElement;
    public untitledRichText: Elements.RichTextElement;
    public message: Elements.TextElement;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'untitled_rich_text') {
                    return 'untitledRichText';
                }
                return elementName;
            })
        });
    }
}