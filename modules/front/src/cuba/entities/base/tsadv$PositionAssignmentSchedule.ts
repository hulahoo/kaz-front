import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { AssignmentSchedule } from "./tsadv$AssignmentSchedule";
export class Timesheet extends BaseUuidEntity {
  static NAME = "tsadv$PositionAssignmentSchedule";
  name?: string | null;
  assignmentGroup?: AssignmentGroupExt | null;
  assignmentSchedules?: AssignmentSchedule | null;
}
export type TimesheetViewName = "_base" | "_local" | "_minimal";
export type TimesheetView<V extends TimesheetViewName> = V extends "_base"
  ? Pick<Timesheet, "id">
  : V extends "_minimal"
  ? Pick<Timesheet, "id">
  : never;
