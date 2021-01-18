import { StandardEntity } from "./sys$StandardEntity";
import { Calendar } from "./tsadv$Calendar";
import { DicWorkingCondition } from "./tsadv$DicWorkingCondition";
import { StandardOffset } from "./tsadv$StandardOffset";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { AssignmentGroupExt } from "./base$AssignmentGroupExt";
export class OrgAnalytics extends StandardEntity {
  static NAME = "tsadv$OrgAnalytics";
  calendar?: Calendar | null;
  workingCondition?: DicWorkingCondition | null;
  offset?: StandardOffset | null;
  organizationGroup?: OrganizationGroupExt | null;
  positionGroup?: PositionGroupExt | null;
  assignmentGroup?: AssignmentGroupExt | null;
}
export type OrgAnalyticsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "orgAnalytics-view"
  | "organalytics.edit";
export type OrgAnalyticsView<V extends OrgAnalyticsViewName> = V extends "_base"
  ? Pick<OrgAnalytics, "id">
  : V extends "_minimal"
  ? Pick<OrgAnalytics, "id">
  : V extends "orgAnalytics-view"
  ? Pick<
      OrgAnalytics,
      | "id"
      | "calendar"
      | "offset"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "workingCondition"
    >
  : V extends "organalytics.edit"
  ? Pick<
      OrgAnalytics,
      | "id"
      | "calendar"
      | "workingCondition"
      | "offset"
      | "organizationGroup"
      | "positionGroup"
      | "assignmentGroup"
    >
  : never;
