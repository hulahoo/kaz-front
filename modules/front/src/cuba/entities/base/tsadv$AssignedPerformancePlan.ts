import { StandardEntity } from "./sys$StandardEntity";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class AssignedPerformancePlan extends StandardEntity {
  static NAME = "tsadv$AssignedPerformancePlan";
  performancePlan?: PerformancePlan | null;
  assignedPerson?: PersonGroupExt | null;
  assigned_by?: PersonGroupExt | null;
}
export type AssignedPerformancePlanViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "assignedPerformancePlan.browse";
export type AssignedPerformancePlanView<
  V extends AssignedPerformancePlanViewName
> = V extends "assignedPerformancePlan.browse"
  ? Pick<
      AssignedPerformancePlan,
      "id" | "performancePlan" | "assignedPerson" | "assigned_by"
    >
  : never;
