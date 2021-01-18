import { StandardEntity } from "./sys$StandardEntity";
import { AssignedEvent } from "./tsadv$AssignedEvent";
import { OrganizationGroupExt } from "./base$OrganizationGroupExt";
export class SafetyPlanEvent extends StandardEntity {
  static NAME = "tsadv$SafetyPlanEvent";
  planName?: string | null;
  assignedEvent?: AssignedEvent[] | null;
  description?: string | null;
  dateFrom?: any | null;
  dateTo?: any | null;
  active?: boolean | null;
  organization?: OrganizationGroupExt | null;
}
export type SafetyPlanEventViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "safetyPlanEvent-view";
export type SafetyPlanEventView<
  V extends SafetyPlanEventViewName
> = V extends "_base"
  ? Pick<
      SafetyPlanEvent,
      "id" | "description" | "planName" | "dateFrom" | "dateTo" | "active"
    >
  : V extends "_local"
  ? Pick<
      SafetyPlanEvent,
      "id" | "planName" | "description" | "dateFrom" | "dateTo" | "active"
    >
  : V extends "_minimal"
  ? Pick<SafetyPlanEvent, "id" | "description">
  : V extends "safetyPlanEvent-view"
  ? Pick<
      SafetyPlanEvent,
      | "id"
      | "description"
      | "planName"
      | "dateFrom"
      | "dateTo"
      | "active"
      | "organization"
      | "assignedEvent"
    >
  : never;
