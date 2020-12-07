import { AbstractDictionary } from "./AbstractDictionary";
import { DicPromotionType } from "./tsadv$DicPromotionType";
export class DicAwardType extends AbstractDictionary {
  static NAME = "tsadv$DicAwardType";
  promotionType?: DicPromotionType | null;
}
export type DicAwardTypeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicAwardType.all";
export type DicAwardTypeView<
  V extends DicAwardTypeViewName
> = V extends "_minimal"
  ? Pick<DicAwardType, "id" | "langValue">
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
  : V extends "_base"
  ? Pick<
      DicAwardType,
      | "id"
      | "langValue"
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
    >
  : never;
