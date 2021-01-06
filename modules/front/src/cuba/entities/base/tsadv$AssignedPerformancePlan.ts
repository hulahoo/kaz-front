import {StandardEntity} from "./sys$StandardEntity";
import {PerformancePlan} from "./tsadv$PerformancePlan";
import {PersonGroupExt} from "./base$PersonGroupExt";

export enum CardStatusEnum {
  DRAFT = "DRAFT",
  COMPLETED = "COMPLETED",
  ASSESSMENT = "ASSESSMENT"
}

export class AssignedPerformancePlan extends StandardEntity {
  static NAME = "tsadv$AssignedPerformancePlan";
  performancePlan?: PerformancePlan | null;
  result?: number | null;
  gzp?: number | null;
  assignedPerson?: PersonGroupExt | null;
  assigned_by?: PersonGroupExt | null;
  status?: CardStatusEnum | null;
}

export type AssignedPerformancePlanViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignedPerformancePlan.browse";
export type AssignedPerformancePlanView<V extends AssignedPerformancePlanViewName> = V extends "_base"
  ? Pick<AssignedPerformancePlan, "id" | "result" | "gzp" | "status">
  : V extends "_local"
    ? Pick<AssignedPerformancePlan, "id" | "result" | "gzp" | "status">
    : V extends "assignedPerformancePlan.browse"
      ? Pick<AssignedPerformancePlan,
        | "id"
        | "result"
        | "gzp"
        | "status"
        | "performancePlan"
        | "assignedPerson"
        | "assigned_by">
      : never;
