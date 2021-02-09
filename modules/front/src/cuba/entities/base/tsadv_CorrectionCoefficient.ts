import { StandardEntity } from "./sys$StandardEntity";
import { PerformancePlan } from "./tsadv$PerformancePlan";
import { DicCompany } from "./base_DicCompany";
export class CorrectionCoefficient extends StandardEntity {
  static NAME = "tsadv_CorrectionCoefficient";
  groupEfficiencyPercent?: any | null;
  companyResult?: any | null;
  performancePlan?: PerformancePlan | null;
  company?: DicCompany | null;
}
export type CorrectionCoefficientViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "correctionCoefficient.edit";
export type CorrectionCoefficientView<
  V extends CorrectionCoefficientViewName
> = V extends "_base"
  ? Pick<
      CorrectionCoefficient,
      "id" | "groupEfficiencyPercent" | "companyResult"
    >
  : V extends "_local"
  ? Pick<
      CorrectionCoefficient,
      "id" | "groupEfficiencyPercent" | "companyResult"
    >
  : V extends "correctionCoefficient.edit"
  ? Pick<
      CorrectionCoefficient,
      | "id"
      | "groupEfficiencyPercent"
      | "companyResult"
      | "performancePlan"
      | "company"
    >
  : never;
