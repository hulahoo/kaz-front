import { AbstractDictionary } from "./AbstractDictionary";
import { DicPromotionType } from "./tsadv$DicPromotionType";
export class DicAwardType extends AbstractDictionary {
  static NAME = "tsadv$DicAwardType";
  promotionType?: DicPromotionType | null;
}
export type DicAwardTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicAwardType.all";
export type DicAwardTypeView<V extends DicAwardTypeViewName> = V extends "_base"
  ? Pick<
      DicAwardType,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "description1"
      | "description2"
      | "description3"
      | "description4"
      | "description5"
      | "startDate"
      | "endDate"
      | "code"
      | "isSystemRecord"
      | "active"
      | "isDefault"
      | "order"
    >
  : V extends "_local"
  ? Pick<
      DicAwardType,
      | "id"
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
  : V extends "_minimal"
  ? Pick<
      DicAwardType,
      | "id"
      | "langValue"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
    >
  : V extends "dicAwardType.all"
  ? Pick<
      DicAwardType,
      | "id"
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
      | "promotionType"
      | "company"
    >
  : never;
