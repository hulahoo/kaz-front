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
  | "_base"
  | "_local"
  | "_minimal"
  | "requisitionRequirement-view";
export type RequisitionRequirementView<
  V extends RequisitionRequirementViewName
> = V extends "_base"
  ? Pick<RequisitionRequirement, "id" | "requirement" | "critical">
  : V extends "_local"
  ? Pick<RequisitionRequirement, "id" | "critical">
  : V extends "_minimal"
  ? Pick<RequisitionRequirement, "id" | "requirement">
  : V extends "requisitionRequirement-view"
  ? Pick<
      RequisitionRequirement,
      "id" | "critical" | "requirement" | "requirementLevel"
    >
  : never;
