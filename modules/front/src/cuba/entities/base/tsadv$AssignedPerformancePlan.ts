import { AbstractBprocRequest } from "./AbstractBprocRequest";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { FileDescriptor } from "./sys$FileDescriptor";
export class AssignedPerformancePlan extends AbstractBprocRequest {
  static NAME = "tsadv$AssignedPerformancePlan";
  static PROCESS_DEFINITION_KEY = "kpi";

  performancePlan?: PerformancePlan | null;
  result?: any | null;
  gzp?: any | null;
  assignedPerson?: PersonGroupExt | null;
  assigned_by?: PersonGroupExt | null;
  stepStageStatus?: any | null;
  startDate?: any | null;
  endDate?: any | null;
  kpiScore?: any | null;
  extraPoint?: any | null;
  finalScore?: any | null;
  companyBonus?: any | null;
  personalBonus?: any | null;
  finalBonus?: any | null;
  maxBonus?: any | null;
  adjustedBonus?: any | null;
  adjustedScore?: any | null;
  maxBonusPercent?: any | null;
  purpose?: string | null;
  file?: FileDescriptor | null;
  lineManager?: PersonGroupExt | null;
}
export type AssignedPerformancePlanViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "assignedPerformancePlan-kpi-team"
  | "assignedPerformancePlan-myKpi"
  | "assignedPerformancePlan-myKpi-edit"
  | "assignedPerformancePlan.browse";
export type AssignedPerformancePlanView<
  V extends AssignedPerformancePlanViewName
> = V extends "_base"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "requestNumber"
      | "stepStageStatus"
      | "result"
      | "gzp"
      | "startDate"
      | "endDate"
      | "kpiScore"
      | "extraPoint"
      | "finalScore"
      | "companyBonus"
      | "personalBonus"
      | "finalBonus"
      | "maxBonus"
      | "adjustedBonus"
      | "adjustedScore"
      | "maxBonusPercent"
      | "purpose"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestDate"
      | "comment"
    >
  : V extends "_local"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "result"
      | "gzp"
      | "stepStageStatus"
      | "startDate"
      | "endDate"
      | "kpiScore"
      | "extraPoint"
      | "finalScore"
      | "companyBonus"
      | "personalBonus"
      | "finalBonus"
      | "maxBonus"
      | "adjustedBonus"
      | "adjustedScore"
      | "maxBonusPercent"
      | "purpose"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
    >
  : V extends "_minimal"
  ? Pick<AssignedPerformancePlan, "id" | "requestNumber" | "stepStageStatus">
  : V extends "assignedPerformancePlan-kpi-team"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "requestNumber"
      | "stepStageStatus"
      | "performancePlan"
      | "startDate"
      | "endDate"
      | "result"
      | "stepStageStatus"
      | "performancePlan"
      | "startDate"
      | "endDate"
      | "stepStageStatus"
      | "assignedPerson"
    >
  : V extends "assignedPerformancePlan-myKpi"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "requestNumber"
      | "stepStageStatus"
      | "performancePlan"
      | "startDate"
      | "endDate"
      | "result"
      | "stepStageStatus"
    >
  : V extends "assignedPerformancePlan-myKpi-edit"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "requestNumber"
      | "stepStageStatus"
      | "performancePlan"
      | "stepStageStatus"
      | "extraPoint"
      | "finalScore"
      | "purpose"
      | "file"
      | "assignedPerson"
      | "status"
    >
  : V extends "assignedPerformancePlan.browse"
  ? Pick<
      AssignedPerformancePlan,
      | "id"
      | "result"
      | "gzp"
      | "stepStageStatus"
      | "startDate"
      | "endDate"
      | "kpiScore"
      | "extraPoint"
      | "finalScore"
      | "companyBonus"
      | "personalBonus"
      | "finalBonus"
      | "maxBonus"
      | "adjustedBonus"
      | "adjustedScore"
      | "maxBonusPercent"
      | "purpose"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requestNumber"
      | "requestDate"
      | "comment"
      | "performancePlan"
      | "assignedPerson"
      | "assigned_by"
      | "status"
    >
  : never;
