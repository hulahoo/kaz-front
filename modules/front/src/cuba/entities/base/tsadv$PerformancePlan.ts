import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
import { PositionGroupExt } from "./base$PositionGroupExt";
import { JobGroup } from "./tsadv$JobGroup";
export class PerformancePlan extends AbstractParentEntity {
  static NAME = "tsadv$PerformancePlan";
  performancePlanName?: string | null;
  previousPlan?: PerformancePlan | null;
  description?: string | null;
  administratorPersonGroup?: PersonGroupExt | null;
  startDate?: any | null;
  endDate?: any | null;
  organizations?: OrganizationGroupExt[] | null;
  positions?: PositionGroupExt[] | null;
  jobs?: JobGroup[] | null;
  accessibilityStartDate?: any | null;
  accessibilityEndDate?: any | null;
}
export type PerformancePlanViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "performancePlan.browse"
  | "performancePlan.edit";
export type PerformancePlanView<
  V extends PerformancePlanViewName
> = V extends "_base"
  ? Pick<
      PerformancePlan,
      | "id"
      | "performancePlanName"
      | "description"
      | "startDate"
      | "endDate"
      | "accessibilityStartDate"
      | "accessibilityEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PerformancePlan,
      | "id"
      | "performancePlanName"
      | "description"
      | "startDate"
      | "endDate"
      | "accessibilityStartDate"
      | "accessibilityEndDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<PerformancePlan, "id" | "performancePlanName">
  : V extends "performancePlan.browse"
  ? Pick<
      PerformancePlan,
      | "id"
      | "performancePlanName"
      | "previousPlan"
      | "description"
      | "administratorPersonGroup"
      | "startDate"
      | "endDate"
      | "accessibilityStartDate"
      | "accessibilityEndDate"
    >
  : V extends "performancePlan.edit"
  ? Pick<
      PerformancePlan,
      | "id"
      | "performancePlanName"
      | "previousPlan"
      | "description"
      | "administratorPersonGroup"
      | "startDate"
      | "endDate"
      | "organizations"
      | "positions"
      | "jobs"
      | "accessibilityStartDate"
      | "accessibilityEndDate"
    >
  : never;
