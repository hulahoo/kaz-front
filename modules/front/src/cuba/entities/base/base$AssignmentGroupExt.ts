import { AssignmentGroup } from "./base$AssignmentGroup";
import { AssignmentExt } from "./base$AssignmentExt";
import { FlySurCharge } from "./tsadv$FlySurCharge";
import { Punishment } from "./tsadv$Punishment";
import { Awards } from "./tsadv$Awards";
import { Salary } from "./tsadv$Salary";
import { SurCharge } from "./tsadv$SurCharge";
import { AssignmentSchedule } from "./tsadv$AssignmentSchedule";
import { OrgAnalytics } from "./tsadv$OrgAnalytics";
export class AssignmentGroupExt extends AssignmentGroup {
  static NAME = "base$AssignmentGroupExt";
  list?: AssignmentExt[] | null;
  assignmentNumber?: string | null;
  flySurCharge?: FlySurCharge[] | null;
  punishment?: Punishment[] | null;
  awards?: Awards[] | null;
  assignment?: AssignmentExt | null;
  relevantAssignment?: AssignmentExt | null;
  salaries?: Salary[] | null;
  surCharge?: SurCharge[] | null;
  assignmentSchedules?: AssignmentSchedule[] | null;
  analytics?: OrgAnalytics | null;
  assignmentPersonFioWithEmployeeNumber?: string | null;
}
export type AssignmentGroupExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignment.analytic.update"
  | "assignmentGroup.master"
  | "assignmentGroup.scheduleView"
  | "assignmentGroup.timecard"
  | "assignmentGroup.view"
  | "assignmentGroupExt-with-employee-number";
export type AssignmentGroupExtView<
  V extends AssignmentGroupExtViewName
> = V extends "_base"
  ? Pick<
      AssignmentGroupExt,
      | "id"
      | "assignmentNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssignmentGroupExt,
      | "id"
      | "assignmentNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<AssignmentGroupExt, "id" | "assignmentNumber">
  : V extends "assignment.analytic.update"
  ? Pick<AssignmentGroupExt, "id" | "assignmentNumber" | "analytics">
  : V extends "assignmentGroup.master"
  ? Pick<
      AssignmentGroupExt,
      | "id"
      | "assignmentNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignment"
      | "salaries"
      | "surCharge"
    >
  : V extends "assignmentGroup.scheduleView"
  ? Pick<AssignmentGroupExt, "id" | "assignmentNumber" | "list">
  : V extends "assignmentGroup.timecard"
  ? Pick<
      AssignmentGroupExt,
      | "id"
      | "assignmentNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "assignment"
    >
  : V extends "assignmentGroup.view"
  ? Pick<
      AssignmentGroupExt,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "assignmentNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "assignment"
      | "analytics"
    >
  : V extends "assignmentGroupExt-with-employee-number"
  ? Pick<
      AssignmentGroupExt,
      | "id"
      | "assignmentNumber"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
    >
  : never;
