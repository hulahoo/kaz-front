import { PositionGroup } from "./base$PositionGroup";
import { PositionExt } from "./base$PositionExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
import { GradeGroup } from "./tsadv$GradeGroup";
import { DicCompany } from "./base_DicCompany";
import { VacationConditions } from "./tsadv$VacationConditions";
import { OrgAnalytics } from "./tsadv$OrgAnalytics";
import { AssignmentExt } from "./base$AssignmentExt";
import { CompetenceElement } from "./tsadv$CompetenceElement";
import { Case } from "./tsadv$Case";
import { SurCharge } from "./tsadv$SurCharge";
import { FlightTimeRate } from "./tsadv$FlightTimeRate";
import { FlySurCharge } from "./tsadv$FlySurCharge";
import { PositionGroupGoalLink } from "./tsadv$PositionGroupGoalLink";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { DicHrRole } from "./tsadv$DicHrRole";
import { JobDescription } from "./tsadv_JobDescription";
export class PositionGroupExt extends PositionGroup {
  static NAME = "base$PositionGroupExt";
  list?: PositionExt[] | null;
  organizationGroup?: OrganizationGroupExt | null;
  jobGroup?: JobGroup | null;
  gradeGroup?: GradeGroup | null;
  company?: DicCompany | null;
  vacationConditionsList?: VacationConditions[] | null;
  analytics?: OrgAnalytics | null;
  position?: PositionExt | null;
  assignments?: AssignmentExt[] | null;
  competenceElements?: CompetenceElement[] | null;
  cases?: Case[] | null;
  surCharge?: SurCharge[] | null;
  flightTimeRate?: FlightTimeRate[] | null;
  flySurCharge?: FlySurCharge[] | null;
  goals?: PositionGroupGoalLink[] | null;
  performancePlans?: PerformancePlan[] | null;
  adminApprove?: DicHrRole | null;
  functionalManagerPositionGroup?: PositionGroupExt | null;
  jobDescription?: JobDescription | null;
  positionName?: string | null;
  fullName?: string | null;
}
export type PositionGroupExtViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assigned-goal-cascade-positionGroupExt-view"
  | "executiveAssistants-browseView"
  | "position.analytic.update"
  | "positionExt-receptionAssignment"
  | "positionGroup.browse"
  | "positionGroup.change.request"
  | "positionGroup.filter"
  | "positionGroup.for.notification"
  | "positionGroup.forAssess"
  | "positionGroup.list"
  | "positionGroup.scheduleView"
  | "positionGroup.timecard"
  | "positionGroupExt-course-matrix"
  | "positionGroupExt-for-cousre-matrix-browse"
  | "positionGroupExt-for-integration-rest"
  | "positionGroupExt-for-position-details"
  | "positionGroupExt-view"
  | "positionGroupExt.admin.approve"
  | "positionGroupExt.for.requisition"
  | "positionGroupExtReqLookupPickerField";
export type PositionGroupExtView<
  V extends PositionGroupExtViewName
> = V extends "_base"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "position"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PositionGroupExt,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PositionGroupExt, "id" | "position">
  : V extends "assigned-goal-cascade-positionGroupExt-view"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "fullName"
    >
  : V extends "executiveAssistants-browseView"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "position"
      | "company"
    >
  : V extends "position.analytic.update"
  ? Pick<PositionGroupExt, "id" | "position" | "analytics">
  : V extends "positionExt-receptionAssignment"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "position"
      | "analytics"
    >
  : V extends "positionGroup.browse"
  ? Pick<PositionGroupExt, "id" | "list" | "position" | "cases" | "analytics">
  : V extends "positionGroup.change.request"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "position"
    >
  : V extends "positionGroup.filter"
  ? Pick<PositionGroupExt, "id" | "list" | "position" | "analytics">
  : V extends "positionGroup.for.notification"
  ? Pick<PositionGroupExt, "id" | "list" | "position">
  : V extends "positionGroup.forAssess"
  ? Pick<
      PositionGroupExt,
      "id" | "position" | "competenceElements" | "analytics"
    >
  : V extends "positionGroup.list"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "list"
      | "vacationConditionsList"
      | "analytics"
      | "position"
      | "jobDescription"
    >
  : V extends "positionGroup.scheduleView"
  ? Pick<PositionGroupExt, "id" | "position" | "list" | "assignments">
  : V extends "positionGroup.timecard"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "position"
      | "assignments"
    >
  : V extends "positionGroupExt-course-matrix"
  ? Pick<
      PositionGroupExt,
      "id" | "position" | "list" | "organizationGroup" | "company"
    >
  : V extends "positionGroupExt-for-cousre-matrix-browse"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "position"
      | "list"
      | "organizationGroup"
      | "gradeGroup"
      | "company"
    >
  : V extends "positionGroupExt-for-integration-rest"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "company"
      | "organizationGroup"
      | "jobGroup"
      | "gradeGroup"
    >
  : V extends "positionGroupExt-for-position-details"
  ? Pick<
      PositionGroupExt,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin" | "list"
    >
  : V extends "positionGroupExt-view"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "fullName"
    >
  : V extends "positionGroupExt.admin.approve"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "adminApprove"
    >
  : V extends "positionGroupExt.for.requisition"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "position"
      | "jobDescription"
      | "functionalManagerPositionGroup"
    >
  : V extends "positionGroupExtReqLookupPickerField"
  ? Pick<
      PositionGroupExt,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "list"
      | "position"
      | "analytics"
    >
  : never;
