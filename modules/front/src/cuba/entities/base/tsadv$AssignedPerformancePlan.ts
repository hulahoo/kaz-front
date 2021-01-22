import { StandardEntity } from "./sys$StandardEntity";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { PersonGroupExt } from "./base$PersonGroupExt";
import {AssignmentExt} from "./base$AssignmentExt";
export class AssignedPerformancePlan extends StandardEntity {
  static NAME = "tsadv$AssignedPerformancePlan";
  performancePlan?: PerformancePlan | null;
  result?: any | null;
  gzp?: any | null;
  assignedPerson?: PersonGroupExt | null;
  assigned_by?: PersonGroupExt | null;
  status?: any | null;
  startDate?: any | null;
  endDate?: any | null;
  kpiScore?: any | null;
  extraPoint?: any | null;
  finalScore?: any | null;
  companyBonus?: any | null;
  personalBonus?: any | null;
  finalBonus?: any | null;
}
export type AssignedPerformancePlanViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignedPerformancePlan.browse";
export type AssignedPerformancePlanView<
  V extends AssignedPerformancePlanViewName
> = V extends "_base"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "result"
      | "gzp"
      | "status"
      | "startDate"
      | "endDate"
      | "kpiScore"
      | "extraPoint"
      | "finalScore"
      | "companyBonus"
      | "personalBonus"
      | "finalBonus"
    >
  : V extends "_local"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "result"
      | "gzp"
      | "status"
      | "startDate"
      | "endDate"
      | "kpiScore"
      | "extraPoint"
      | "finalScore"
      | "companyBonus"
      | "personalBonus"
      | "finalBonus"
    >
  : V extends "assignedPerformancePlan.browse"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "result"
      | "gzp"
      | "status"
      | "startDate"
      | "endDate"
      | "kpiScore"
      | "extraPoint"
      | "finalScore"
      | "companyBonus"
      | "personalBonus"
      | "finalBonus"
      | "performancePlan"
      | "assignedPerson"
      | "assigned_by"
    >
  : never;
