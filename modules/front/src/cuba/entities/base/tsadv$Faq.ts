import { AbstractParentEntity } from "./AbstractParentEntity";
export class Faq extends AbstractParentEntity {
  static NAME = "tsadv$Faq";
  langValue1?: string | null;
  order?: number | null;
  langValue2?: string | null;
  langValue3?: string | null;
  langValue4?: string | null;
  langValue5?: string | null;
  contentLangValue1?: string | null;
  contentLangValue2?: string | null;
  contentLangValue3?: string | null;
  contentLangValue4?: string | null;
  contentLangValue5?: string | null;
  langValue?: string | null;
  contentLangValue?: string | null;
}
export type FaqViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "faq.browse"
  | "faq.edit";
export type FaqView<V extends FaqViewName> = V extends "_minimal"
  ? Pick<Faq, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      Faq,
      | "id"
      | "langValue1"
      | "order"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "contentLangValue1"
      | "contentLangValue2"
      | "contentLangValue3"
      | "contentLangValue4"
      | "contentLangValue5"
      | "langValue"
      | "contentLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Faq,
      | "id"
      | "langValue"
      | "langValue1"
      | "order"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "contentLangValue1"
      | "contentLangValue2"
      | "contentLangValue3"
      | "contentLangValue4"
      | "contentLangValue5"
      | "contentLangValue"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "faq.browse"
  ? Pick<
      Faq,
      | "id"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "contentLangValue1"
      | "contentLangValue2"
      | "contentLangValue3"
      | "contentLangValue4"
      | "contentLangValue5"
      | "order"
      | "langValue"
    >
  : V extends "faq.edit"
  ? Pick<
      Faq,
      | "id"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "contentLangValue1"
      | "contentLangValue2"
      | "contentLangValue3"
      | "contentLangValue4"
      | "contentLangValue5"
      | "order"
    >
  : never;
