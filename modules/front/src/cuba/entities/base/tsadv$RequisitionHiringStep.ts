import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { HiringStep } from "./tsadv$HiringStep";
export class RequisitionHiringStep extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionHiringStep";
  requisition?: Requisition | null;
  required?: boolean | null;
  hiringStep?: HiringStep | null;
  order?: number | null;
}
export type RequisitionHiringStepViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "requisition-hiring-step-for-filter"
  | "requisitionHiringStep.view";
export type RequisitionHiringStepView<
  V extends RequisitionHiringStepViewName
> = V extends "_base"
  ? Pick<
      RequisitionHiringStep,
      | "id"
      | "required"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      RequisitionHiringStep,
      | "id"
      | "required"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<RequisitionHiringStep, "id">
  : V extends "requisition-hiring-step-for-filter"
  ? Pick<
      RequisitionHiringStep,
      | "id"
      | "required"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "hiringStep"
    >
  : V extends "requisitionHiringStep.view"
  ? Pick<
      RequisitionHiringStep,
      | "id"
      | "required"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "hiringStep"
    >
  : never;
