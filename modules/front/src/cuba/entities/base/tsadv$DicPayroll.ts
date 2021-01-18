import { AbstractDictionary } from "./AbstractDictionary";
export class DicPayroll extends AbstractDictionary {
  static NAME = "tsadv$DicPayroll";
}
export type DicPayrollViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "dicPayroll.view";
export type DicPayrollView<V extends DicPayrollViewName> = V extends "_base"
  ? Pick<
      DicPayroll,
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
      DicPayroll,
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
  ? Pick<DicPayroll, "id" | "langValue">
  : V extends "dicPayroll.view"
  ? Pick<DicPayroll, "id" | "langValue" | "langValue1">
  : never;
