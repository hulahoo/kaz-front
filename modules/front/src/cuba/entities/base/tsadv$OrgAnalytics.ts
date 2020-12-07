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
  | "_minimal"
  | "_local"
  | "_base"
  | "organalytics.edit"
  | "orgAnalytics-view";
export type OrgAnalyticsView<
  V extends OrgAnalyticsViewName
> = V extends "_minimal"
  ? Pick<OrgAnalytics, "id">
  : V extends "_base"
  ? Pick<OrgAnalytics, "id">
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
  : never;
