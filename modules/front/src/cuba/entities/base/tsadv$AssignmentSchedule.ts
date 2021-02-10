import { AbstractParentEntity } from "./AbstractParentEntity";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
import { StandardSchedule } from "./tsadv$StandardSchedule";
import { StandardOffset } from "./tsadv$StandardOffset";
export class AssignmentSchedule extends AbstractParentEntity {
  static NAME = "tsadv$AssignmentSchedule";
  assignmentGroup?: AssignmentGroupExt | null;
  schedule?: StandardSchedule | null;
  offset?: StandardOffset | null;
  startDate?: any | null;
  endDate?: any | null;
  colorsSet?: any | null;
  name?: string | null;
}
export type AssignmentScheduleViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignmentSchedule-for-my-team"
  | "assignmentSchedule.view";
export type AssignmentScheduleView<
  V extends AssignmentScheduleViewName
> = V extends "_base"
  ? Pick<
      AssignmentSchedule,
      | "id"
      | "startDate"
      | "endDate"
      | "colorsSet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssignmentSchedule,
      | "id"
      | "startDate"
      | "endDate"
      | "colorsSet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AssignmentSchedule, "id">
  : V extends "assignmentSchedule-for-my-team"
  ? Pick<
      AssignmentSchedule,
      | "id"
      | "startDate"
      | "endDate"
      | "colorsSet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
      | "name"
      | "schedule"
      | "offset"
    >
  : V extends "assignmentSchedule.view"
  ? Pick<
      AssignmentSchedule,
      | "id"
      | "startDate"
      | "endDate"
      | "colorsSet"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignmentGroup"
      | "schedule"
      | "offset"
    >
  : never;
