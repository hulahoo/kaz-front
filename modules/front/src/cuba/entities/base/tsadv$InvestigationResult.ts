import { StandardEntity } from "./sys$StandardEntity";
import { InvestigationType } from "./tsadv$InvestigationType";
import { AccidenInjured } from "./tsadv$AccidenInjured";
export class InvestigationResult extends StandardEntity {
  static NAME = "tsadv$InvestigationResult";
  investigationDate?: any | null;
  investigationType?: InvestigationType | null;
  productionConnection?: boolean | null;
  employeeGuilt?: any | null;
  employerguilt?: any | null;
  accidenInjured?: AccidenInjured | null;
}
export type InvestigationResultViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "investigationResult-view";
export type InvestigationResultView<
  V extends InvestigationResultViewName
> = V extends "_local"
  ? Pick<
      InvestigationResult,
      | "id"
      | "investigationDate"
      | "productionConnection"
      | "employeeGuilt"
      | "employerguilt"
    >
  : V extends "_base"
  ? Pick<
      InvestigationResult,
      | "id"
      | "investigationDate"
      | "productionConnection"
      | "employeeGuilt"
      | "employerguilt"
    >
  : V extends "investigationResult-view"
  ? Pick<
      InvestigationResult,
      | "id"
      | "investigationDate"
      | "investigationType"
      | "productionConnection"
      | "employeeGuilt"
      | "employerguilt"
    >
  : never;
