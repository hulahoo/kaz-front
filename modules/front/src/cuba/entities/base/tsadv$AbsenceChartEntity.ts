import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AssignmentAbsenceChartEntity } from "./tsadv$AssignmentAbsenceChartEntity";
export class AbsenceChartEntity extends BaseUuidEntity {
  static NAME = "tsadv$AbsenceChartEntity";
  dateFrom?: any | null;
  dateTo?: any | null;
  absenceDays?: number | null;
  color?: string | null;
  index?: number | null;
  absenceType?: string | null;
  assignmentAbsence?: AssignmentAbsenceChartEntity | null;
}
export type AbsenceChartEntityViewName = "_minimal" | "_local" | "_base";
export type AbsenceChartEntityView<
  V extends AbsenceChartEntityViewName
> = never;
