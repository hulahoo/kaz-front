import { AbstractDictionary } from "./AbstractDictionary";
export class DicPersonType extends AbstractDictionary {
  static NAME = "tsadv$DicPersonType";
  sortOrder?: number | null;
}
export type DicPersonTypeViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "dicPersonType.all";
export type DicPersonTypeView<
  V extends DicPersonTypeViewName
> = V extends "_minimal"
  ? Pick<DicPersonType, "id" | "langValue">
  : V extends "_local"
  ? Pick<
      DicPersonType,
      | "id"
      | "sortOrder"
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
      DicPersonType,
      | "id"
      | "langValue"
      | "sortOrder"
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
  : V extends "dicPersonType.all"
  ? Pick<
      DicPersonType,
      | "id"
      | "sortOrder"
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
