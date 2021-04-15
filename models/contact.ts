
import { ContentItem, Elements } from '@kentico/kontent-delivery';

/**
 * Generated by '@kentico/kontent-model-generator@3.2.0'
 * Tip: You can replace 'ContentItem' with another generated class to fully leverage strong typing.
 */
export class Contact extends ContentItem {
    public addressNote: Elements.TextElement;
    public zipCode: Elements.TextElement;
    public officeHoursNote: Elements.TextElement;
    public city: Elements.TextElement;
    public phone: Elements.RichTextElement;
    public eMail: Elements.TextElement;
    public streetNumber: Elements.NumberElement;
    public street: Elements.TextElement;
    public officeHours: Elements.TextElement;
    constructor() {
        super({
            propertyResolver: ((elementName: string) => {
                if (elementName === 'address___note') {
                    return 'addressNote';
                }
                if (elementName === 'zip_code') {
                    return 'zipCode';
                }
                if (elementName === 'office_hours___note') {
                    return 'officeHoursNote';
                }
                if (elementName === 'e_mail') {
                    return 'eMail';
                }
                if (elementName === 'street_number') {
                    return 'streetNumber';
                }
                if (elementName === 'office_hours') {
                    return 'officeHours';
                }
                return elementName;
            })
        });
    }
}