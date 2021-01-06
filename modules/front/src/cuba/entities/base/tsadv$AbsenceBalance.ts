import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { AbsenceToAbsenceBalance } from "./tsadv$AbsenceToAbsenceBalance";
export class AbsenceBalance extends AbstractParentEntity {
  static NAME = "tsadv$AbsenceBalance";
  personGroup?: PersonGroupExt | null;
  overallBalanceDays?: number | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  balanceDays?: number | null;
  additionalBalanceDays?: number | null;
  daysSpent?: number | null;
  daysLeft?: number | null;
  extraDaysSpent?: number | null;
  extraDaysLeft?: number | null;
  longAbsenceDays?: number | null;
  absenceToAbsenceBalances?: AbsenceToAbsenceBalance[] | null;
  addBalanceDaysAims?: number | null;
}
export type AbsenceBalanceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceBalance.browse"
  | "absenceBalance.edit"
  | "absenceBalance.view";
export type AbsenceBalanceView<
  V extends AbsenceBalanceViewName
> = V extends "_base"
  ? Pick<
      AbsenceBalance,
      | "id"
      | "additionalBalanceDays"
      | "balanceDays"
      | "dateFrom"
      | "dateTo"
      | "overallBalanceDays"
      | "daysSpent"
      | "daysLeft"
      | "extraDaysSpent"
      | "extraDaysLeft"
      | "longAbsenceDays"
      | "addBalanceDaysAims"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AbsenceBalance,
      | "id"
      | "overallBalanceDays"
      | "dateFrom"
      | "dateTo"
      | "balanceDays"
      | "additionalBalanceDays"
      | "daysSpent"
      | "daysLeft"
      | "extraDaysSpent"
      | "extraDaysLeft"
      | "longAbsenceDays"
      | "addBalanceDaysAims"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<
      AbsenceBalance,
      "id" | "additionalBalanceDays" | "balanceDays" | "dateFrom" | "dateTo"
    >
  : V extends "absenceBalance.browse"
  ? Pick<
      AbsenceBalance,
      | "id"
      | "overallBalanceDays"
      | "dateFrom"
      | "dateTo"
      | "balanceDays"
      | "additionalBalanceDays"
      | "daysSpent"
      | "daysLeft"
      | "extraDaysSpent"
      | "extraDaysLeft"
      | "longAbsenceDays"
      | "addBalanceDaysAims"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "absenceToAbsenceBalances"
    >
  : V extends "absenceBalance.edit"
  ? Pick<
      AbsenceBalance,
      | "id"
      | "overallBalanceDays"
      | "dateFrom"
      | "dateTo"
      | "balanceDays"
      | "additionalBalanceDays"
      | "daysSpent"
      | "daysLeft"
      | "extraDaysSpent"
      | "extraDaysLeft"
      | "longAbsenceDays"
      | "addBalanceDaysAims"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "personGroup"
    >
  : V extends "absenceBalance.view"
  ? Pick<
      AbsenceBalance,
      | "id"
      | "overallBalanceDays"
      | "dateFrom"
      | "dateTo"
      | "balanceDays"
      | "additionalBalanceDays"
      | "daysSpent"
      | "daysLeft"
      | "extraDaysSpent"
      | "extraDaysLeft"
      | "longAbsenceDays"
      | "addBalanceDaysAims"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
