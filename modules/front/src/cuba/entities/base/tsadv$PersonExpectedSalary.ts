import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { DicCurrency } from "./base$DicCurrency";
export class PersonExpectedSalary extends AbstractParentEntity {
  static NAME = "tsadv$PersonExpectedSalary";
  personGroup?: PersonGroupExt | null;
  actualDate?: any | null;
  amount?: any | null;
  grossNet?: any | null;
  currency?: DicCurrency | null;
}
export type PersonExpectedSalaryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personExpectedSalary.view";
export type PersonExpectedSalaryView<
  V extends PersonExpectedSalaryViewName
> = V extends "_base"
  ? Pick<
      PersonExpectedSalary,
      | "id"
      | "actualDate"
      | "amount"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonExpectedSalary,
      | "id"
      | "actualDate"
      | "amount"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PersonExpectedSalary, "id">
  : V extends "personExpectedSalary.view"
  ? Pick<
      PersonExpectedSalary,
      | "id"
      | "actualDate"
      | "amount"
      | "grossNet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
      | "currency"
    >
  : never;
