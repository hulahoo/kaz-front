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
  | "_minimal"
  | "_local"
  | "_base"
  | "assignmentSchedule.view";
export type AssignmentScheduleView<
  V extends AssignmentScheduleViewName
> = V extends "_minimal"
  ? Pick<AssignmentSchedule, "id">
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
  : V extends "_base"
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
