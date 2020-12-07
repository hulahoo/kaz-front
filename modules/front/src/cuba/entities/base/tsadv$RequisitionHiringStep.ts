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
  | "_minimal"
  | "_local"
  | "_base"
  | "requisitionHiringStep.view"
  | "requisition-hiring-step-for-filter";
export type RequisitionHiringStepView<
  V extends RequisitionHiringStepViewName
> = V extends "_minimal"
  ? Pick<RequisitionHiringStep, "id">
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
  : V extends "_base"
  ? Pick<
      RequisitionHiringStep,
      | "id"
      | "required"
      | "order"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
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
  : never;
