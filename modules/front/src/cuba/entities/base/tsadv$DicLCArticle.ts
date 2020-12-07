import { AbstractDictionary } from "./AbstractDictionary";
export class DicLCArticle extends AbstractDictionary {
  static NAME = "tsadv$DicLCArticle";
  article?: string | null;
  item?: string | null;
  subItem?: string | null;
  attribute?: any | null;
}
export type DicLCArticleViewName = "_minimal" | "_local" | "_base";
export type DicLCArticleView<
  V extends DicLCArticleViewName
> = V extends "_minimal"
  ? Pick<DicLCArticle, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicLCArticle,
      | "id"
      | "article"
      | "item"
      | "subItem"
      | "attribute"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_base"
  ? Pick<
      DicLCArticle,
      | "id"
      | "langValue"
      | "article"
      | "item"
      | "subItem"
      | "attribute"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "langValue1"
      | "description1"
      | "langValue2"
      | "description2"
      | "langValue3"
      | "description3"
      | "langValue4"
      | "description4"
      | "langValue5"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : never;
