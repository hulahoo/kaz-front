import { AbstractParentEntity } from "./AbstractParentEntity";
import { Requisition } from "./tsadv$Requisition";
import { RcQuestionnaire } from "./tsadv$RcQuestionnaire";
export class RequisitionQuestionnaire extends AbstractParentEntity {
  static NAME = "tsadv$RequisitionQuestionnaire";
  requisition?: Requisition | null;
  questionnaire?: RcQuestionnaire | null;
  weight?: any | null;
}
export type RequisitionQuestionnaireViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "requisitionQuestionnaire.view";
export type RequisitionQuestionnaireView<
  V extends RequisitionQuestionnaireViewName
> = V extends "_minimal"
  ? Pick<RequisitionQuestionnaire, "id">
  : V extends "_local"
  ? Pick<
      RequisitionQuestionnaire,
      "id" | "weight" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RequisitionQuestionnaire,
      "id" | "weight" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "requisitionQuestionnaire.view"
  ? Pick<
      RequisitionQuestionnaire,
      | "id"
      | "weight"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "requisition"
      | "questionnaire"
    >
  : never;
