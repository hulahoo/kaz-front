import { AbstractParentEntity } from "./AbstractParentEntity";
import { PerformancePlan } from "./tsadv$PerformancePlan";
export class InstructionsKpi extends AbstractParentEntity {
  static NAME = "tsadv_InstructionsKpi";
  instruction?: string | null;
  performancePlan?: PerformancePlan | null;
}
export type InstructionsKpiViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "instructionsKpi.edit";
export type InstructionsKpiView<
  V extends InstructionsKpiViewName
> = V extends "_base"
  ? Pick<
      InstructionsKpi,
      | "id"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      InstructionsKpi,
      | "id"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "instructionsKpi.edit"
  ? Pick<
      InstructionsKpi,
      | "id"
      | "instruction"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "performancePlan"
    >
  : never;
