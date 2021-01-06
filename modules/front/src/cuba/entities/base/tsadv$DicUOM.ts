import { AbstractDictionary } from "./AbstractDictionary";
export class DicUOM extends AbstractDictionary {
  static NAME = "tsadv$DicUOM";
}
export type DicUOMViewName = "_base" | "_local" | "_minimal" | "dicUOM.browse";
export type DicUOMView<V extends DicUOMViewName> = V extends "_base"
  ? Pick<
      DicUOM,
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
  : V extends "_local"
  ? Pick<
      DicUOM,
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
  ? Pick<DicUOM, "id" | "langValue">
  : V extends "dicUOM.browse"
  ? Pick<
      DicUOM,
      | "id"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "isSystemRecord"
    >
  : never;
