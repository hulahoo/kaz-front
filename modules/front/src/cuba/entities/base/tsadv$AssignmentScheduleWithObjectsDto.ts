import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AssignmentSchedule } from "./tsadv$AssignmentSchedule";
export class AssignmentScheduleWithObjectsDto extends BaseUuidEntity {
  static NAME = "tsadv$AssignmentScheduleWithObjectsDto";
  assignmentSchedule?: AssignmentSchedule | null;
}
export type AssignmentScheduleWithObjectsDtoViewName =
  | "_base"
  | "_local"
  | "_minimal";
export type AssignmentScheduleWithObjectsDtoView<
  V extends AssignmentScheduleWithObjectsDtoViewName
> = never;
