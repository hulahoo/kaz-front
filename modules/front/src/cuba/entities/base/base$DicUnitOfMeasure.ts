import { AbstractSortableDictionary } from "./AbstractSortableDictionary";
export class DicUnitOfMeasure extends AbstractSortableDictionary {
  static NAME = "base$DicUnitOfMeasure";
  isBasic?: boolean | null;
  basicUOM?: DicUnitOfMeasure | null;
  rate?: any | null;
}
export type DicUnitOfMeasureViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicUnitOfMeasure.view";
export type DicUnitOfMeasureView<
  V extends DicUnitOfMeasureViewName
> = V extends "_base"
  ? Pick<
      DicUnitOfMeasure,
      | "id"
      | "description"
      | "isBasic"
      | "rate"
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
      | "languageValue"
    >
  : V extends "_local"
  ? Pick<
      DicUnitOfMeasure,
      | "id"
      | "isBasic"
      | "rate"
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
      | "languageValue"
    >
  : V extends "_minimal"
  ? Pick<DicUnitOfMeasure, "id" | "description">
  : V extends "dicUnitOfMeasure.view"
  ? Pick<
      DicUnitOfMeasure,
      | "id"
      | "isBasic"
      | "rate"
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
      | "languageValue"
      | "basicUOM"
    >
  : never;
