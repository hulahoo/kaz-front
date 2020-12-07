import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { AssignmentSchedule } from "./tsadv$AssignmentSchedule";
export class AssignmentScheduleWithObjectsDto extends BaseUuidEntity {
  static NAME = "tsadv$AssignmentScheduleWithObjectsDto";
  assignmentSchedule?: AssignmentSchedule | null;
}
export type AssignmentScheduleWithObjectsDtoViewName =
  | "_minimal"
  | "_local"
  | "_base";
export type AssignmentScheduleWithObjectsDtoView<
  V extends AssignmentScheduleWithObjectsDtoViewName
> = never;
