import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AbsenceChartEntity } from "./tsadv$AbsenceChartEntity";
export class AssignmentAbsenceChartEntity extends BaseUuidEntity {
  static NAME = "tsadv$AssignmentAbsenceChartEntity";
  personFullName?: string | null;
  absences?: AbsenceChartEntity | null;
  assignmentGroupId?: any | null;
}
export type AssignmentAbsenceChartEntityViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type AssignmentAbsenceChartEntityView<
  V extends AssignmentAbsenceChartEntityViewName
> = never;
