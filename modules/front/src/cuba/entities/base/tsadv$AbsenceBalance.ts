import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { AbsenceToAbsenceBalance } from "./tsadv$AbsenceToAbsenceBalance";
export class AbsenceBalance extends AbstractParentEntity {
  static NAME = "tsadv$AbsenceBalance";
  personGroup?: PersonGroupExt | null;
  overallBalanceDays?: any | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  balanceDays?: any | null;
  additionalBalanceDays?: any | null;
  daysSpent?: any | null;
  daysLeft?: any | null;
  extraDaysSpent?: any | null;
  extraDaysLeft?: any | null;
  longAbsenceDays?: any | null;
  absenceToAbsenceBalances?: AbsenceToAbsenceBalance[] | null;
  addBalanceDaysAims?: any | null;
  ecologicalDueDays?: any | null;
  disabilityDueDays?: any | null;
  ecologicalDaysLeft?: any | null;
  disabilityDaysLeft?: any | null;
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
      | "ecologicalDueDays"
      | "disabilityDueDays"
      | "ecologicalDaysLeft"
      | "disabilityDaysLeft"
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
      | "ecologicalDueDays"
      | "disabilityDueDays"
      | "ecologicalDaysLeft"
      | "disabilityDaysLeft"
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
      | "ecologicalDueDays"
      | "disabilityDueDays"
      | "ecologicalDaysLeft"
      | "disabilityDaysLeft"
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
      | "ecologicalDueDays"
      | "disabilityDueDays"
      | "ecologicalDaysLeft"
      | "disabilityDaysLeft"
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
      | "ecologicalDueDays"
      | "disabilityDueDays"
      | "ecologicalDaysLeft"
      | "disabilityDaysLeft"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
