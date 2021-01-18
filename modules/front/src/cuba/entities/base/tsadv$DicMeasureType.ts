import { AbstractDictionary } from "./AbstractDictionary";
export class DicMeasureType extends AbstractDictionary {
  static NAME = "tsadv$DicMeasureType";
}
export type DicMeasureTypeViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicMeasureType.browse";
export type DicMeasureTypeView<
  V extends DicMeasureTypeViewName
> = V extends "_base"
  ? Pick<
      DicMeasureType,
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
      DicMeasureType,
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
  ? Pick<DicMeasureType, "id" | "langValue">
  : V extends "dicMeasureType.browse"
  ? Pick<
      DicMeasureType,
      | "id"
      | "langValue1"
      | "langValue2"
      | "langValue3"
      | "langValue4"
      | "langValue5"
      | "isSystemRecord"
    >
  : never;
