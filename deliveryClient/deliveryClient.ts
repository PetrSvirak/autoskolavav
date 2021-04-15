import { TypeResolver, DeliveryClient } from "@kentico/kontent-delivery";
import { Action } from "../models/action";
import { Article } from "../models/article";
import { Form } from "../models/form";
import { Contact } from "../models/contact";
import { Date as DateModel } from "../models/date";
import { Forms } from "../models/forms";
import { Gallery } from "../models/gallery";
import { Link } from "../models/link";
import { PhoneNumber } from "../models/phone_number";
import { Price } from "../models/price";
import { PriceList } from "../models/price_list";
import { Term } from "../models/term";
import { TermsPage } from "../models/terms_page";
import { Test } from "../models/test";
import { Workshop } from "../models/workshop";
import { Vehicle } from "../models/vehicle";

const getDeliveryClient = (): DeliveryClient => {
  const usePreviewMode = !!process.env.previewApiKey;

  return new DeliveryClient({
    projectId: process.env.projectId,
    previewApiKey: process.env.previewApiKey,
    globalQueryConfig: {
      usePreviewMode,
    },
    typeResolvers: [
      new TypeResolver("action", () => new Action()),
      new TypeResolver("article", () => new Article()),
      new TypeResolver("contact", () => new Contact()),
      new TypeResolver("date", () => new DateModel()),
      new TypeResolver("form", () => new Form()),
      new TypeResolver("forms", () => new Forms()),
      new TypeResolver("gallery", () => new Gallery()),
      new TypeResolver("link", () => new Link()),
      new TypeResolver("phone_number", () => new PhoneNumber()),
      new TypeResolver("price", () => new Price()),
      new TypeResolver("price_list", () => new PriceList()),
      new TypeResolver("term", () => new Term()),
      new TypeResolver("terms_page", () => new TermsPage()),
      new TypeResolver("test", () => new Test()),
      new TypeResolver("vehicle", () => new Vehicle()),
      new TypeResolver("workshop", () => new Workshop()),
    ],
  });
};

export const deliveryClient = getDeliveryClient();
