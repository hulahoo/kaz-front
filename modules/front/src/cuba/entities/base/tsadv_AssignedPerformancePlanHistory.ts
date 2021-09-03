import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicPerformanceStage } from "./tsadv_DicPerformanceStage";
import { DicRequestStatus } from "./tsadv$DicRequestStatus";
import { AssignedPerformancePlan } from "./tsadv$AssignedPerformancePlan";
export class AssignedPerformancePlanHistory extends AbstractParentEntity {
  static NAME = "tsadv_AssignedPerformancePlanHistory";
  stage?: DicPerformanceStage | null;
  status?: DicRequestStatus | null;
  assignedPerformancePlan?: AssignedPerformancePlan | null;
}
export type AssignedPerformancePlanHistoryViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignedPerformancePlanHistory.edit";
export type AssignedPerformancePlanHistoryView<
  V extends AssignedPerformancePlanHistoryViewName
> = V extends "_base"
  ? Pick<
      AssignedPerformancePlanHistory,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      AssignedPerformancePlanHistory,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "assignedPerformancePlanHistory.edit"
  ? Pick<
      AssignedPerformancePlanHistory,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "stage"
      | "status"
      | "assignedPerformancePlan"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
    >
  : never;
