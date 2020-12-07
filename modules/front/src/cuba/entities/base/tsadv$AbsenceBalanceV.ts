import { StandardEntity } from "./sys$StandardEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class AbsenceBalanceV extends StandardEntity {
  static NAME = "tsadv$AbsenceBalanceV";
  personGroup?: PersonGroupExt | null;
  legacyID?: string | null;
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
  | "_minimal"
  | "_local"
  | "_base"
  | "absenceBalanceV.browse";
export type AbsenceBalanceVView<
  V extends AbsenceBalanceVViewName
> = V extends "_local"
  ? Pick<
      AbsenceBalanceV,
      | "id"
      | "legacyID"
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
  : V extends "_base"
  ? Pick<
      AbsenceBalanceV,
      | "id"
      | "legacyID"
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
      | "legacyID"
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
