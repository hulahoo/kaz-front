import { StandardEntity } from "./sys$StandardEntity";
import { RcQuestion } from "./tsadv$RcQuestion";
import { Requisition } from "./tsadv$Requisition";
import { RcAnswer } from "./tsadv$RcAnswer";
export class RequisitionRequirement extends StandardEntity {
  static NAME = "tsadv$RequisitionRequirement";
  requirement?: RcQuestion | null;
  requisition?: Requisition | null;
  requirementLevel?: RcAnswer | null;
  critical?: boolean | null;
}
export type RequisitionRequirementViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "requisitionRequirement-view";
export type RequisitionRequirementView<
  V extends RequisitionRequirementViewName
> = V extends "_minimal"
  ? Pick<RequisitionRequirement, "id" | "requirement">
  : V extends "_local"
  ? Pick<RequisitionRequirement, "id" | "critical">
  : V extends "_base"
  ? Pick<RequisitionRequirement, "id" | "requirement" | "critical">
  : V extends "requisitionRequirement-view"
  ? Pick<
      RequisitionRequirement,
      "id" | "critical" | "requirement" | "requirementLevel"
    >
  : never;
