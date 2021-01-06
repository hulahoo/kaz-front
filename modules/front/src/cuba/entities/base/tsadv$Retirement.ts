import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRetirementType } from "./tsadv$DicRetirementType";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class Retirement extends AbstractParentEntity {
  static NAME = "tsadv$Retirement";
  retirementType?: DicRetirementType | null;
  documentNumber?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  personGroupExt?: PersonGroupExt | null;
}
export type RetirementViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "retirement.all";
export type RetirementView<V extends RetirementViewName> = V extends "_base"
  ? Pick<
      Retirement,
      | "id"
      | "documentNumber"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      Retirement,
      | "id"
      | "documentNumber"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "retirement.all"
  ? Pick<
      Retirement,
      | "id"
      | "documentNumber"
      | "dateFrom"
      | "dateTo"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "retirementType"
    >
  : never;
