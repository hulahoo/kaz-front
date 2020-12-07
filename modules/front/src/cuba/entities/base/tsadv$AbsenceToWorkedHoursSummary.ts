import { AbstractParentEntity } from "./AbstractParentEntity";
import { Absence } from "./tsadv$Absence";
import { WorkedHoursSummary } from "./tsadv$WorkedHoursSummary";
export class AbsenceToWorkedHoursSummary extends AbstractParentEntity {
  static NAME = "tsadv$AbsenceToWorkedHoursSummary";
  absence?: Absence | null;
  workedHoursSummary?: WorkedHoursSummary | null;
}
export type AbsenceToWorkedHoursSummaryViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type AbsenceToWorkedHoursSummaryView<
  V extends AbsenceToWorkedHoursSummaryViewName
> = V extends "_local"
  ? Pick<
      AbsenceToWorkedHoursSummary,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      AbsenceToWorkedHoursSummary,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : never;
