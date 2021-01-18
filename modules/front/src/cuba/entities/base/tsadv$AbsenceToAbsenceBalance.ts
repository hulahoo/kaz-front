import { StandardEntity } from "./sys$StandardEntity";
import { Absence } from "./tsadv$Absence";
import { AbsenceBalance } from "./tsadv$AbsenceBalance";
export class AbsenceToAbsenceBalance extends StandardEntity {
  static NAME = "tsadv$AbsenceToAbsenceBalance";
  absence?: Absence | null;
  additionalAbsenceDays?: number | null;
  absenceBalance?: AbsenceBalance | null;
  absenceDays?: number | null;
}
export type AbsenceToAbsenceBalanceViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "absenceToAbsenceBalance.view";
export type AbsenceToAbsenceBalanceView<
  V extends AbsenceToAbsenceBalanceViewName
> = V extends "_base"
  ? Pick<
      AbsenceToAbsenceBalance,
      "id" | "additionalAbsenceDays" | "absenceDays"
    >
  : V extends "_local"
  ? Pick<
      AbsenceToAbsenceBalance,
      "id" | "additionalAbsenceDays" | "absenceDays"
    >
  : V extends "absenceToAbsenceBalance.view"
  ? Pick<
      AbsenceToAbsenceBalance,
      | "id"
      | "additionalAbsenceDays"
      | "absenceDays"
      | "absence"
      | "absenceBalance"
    >
  : never;
