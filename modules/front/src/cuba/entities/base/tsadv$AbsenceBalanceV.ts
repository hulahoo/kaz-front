import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class AbsenceBalanceV extends StandardEntity {
  static NAME = "tsadv$AbsenceBalanceV";
  personGroup?: PersonGroupExt | null;
  legacyId?: string | null;
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
}
export type AbsenceBalanceVViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceBalanceV.browse";
export type AbsenceBalanceVView<
  V extends AbsenceBalanceVViewName
> = V extends "_base"
  ? Pick<
      AbsenceBalanceV,
      | "id"
      | "legacyId"
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
    >
  : V extends "_local"
  ? Pick<
      AbsenceBalanceV,
      | "id"
      | "legacyId"
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
    >
  : V extends "absenceBalanceV.browse"
  ? Pick<
      AbsenceBalanceV,
      | "id"
      | "legacyId"
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
    >
  : never;
