import { AbstractParentEntity } from "./AbstractParentEntity";
import { HiringStepMember } from "./tsadv$HiringStepMember";
import { HiringStepQuestionnaire } from "./tsadv$HiringStepQuestionnaire";
import { Test } from "./tsadv$Test";
export class HiringStep extends AbstractParentEntity {
  static NAME = "tsadv$HiringStep";
  stepName?: string | null;
  isJobTest?: boolean | null;
  type?: any | null;
  attempts_control_level?: any | null;
  period?: any | null;
  attempts?: any | null;
  number_between_attempts?: any | null;
  stepDescription?: string | null;
  startDate?: any | null;
  endDate?: any | null;
  members?: HiringStepMember[] | null;
  questionnaires?: HiringStepQuestionnaire[] | null;
  test?: Test | null;
  default_?: boolean | null;
  orderDefault?: number | null;
}
export type HiringStepViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "hiringStep-for-listener"
  | "hiringStep.view"
  | "hiringStepForRequisition.view";
export type HiringStepView<V extends HiringStepViewName> = V extends "_base"
  ? Pick<
      HiringStep,
      | "id"
      | "stepName"
      | "isJobTest"
      | "type"
      | "attempts_control_level"
      | "period"
      | "attempts"
      | "number_between_attempts"
      | "stepDescription"
      | "startDate"
      | "endDate"
      | "default_"
      | "orderDefault"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HiringStep,
      | "id"
      | "stepName"
      | "isJobTest"
      | "type"
      | "attempts_control_level"
      | "period"
      | "attempts"
      | "number_between_attempts"
      | "stepDescription"
      | "startDate"
      | "endDate"
      | "default_"
      | "orderDefault"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<HiringStep, "id" | "stepName">
  : V extends "hiringStep-for-listener"
  ? Pick<HiringStep, "id" | "stepName" | "default_" | "orderDefault">
  : V extends "hiringStep.view"
  ? Pick<
      HiringStep,
      | "id"
      | "stepName"
      | "isJobTest"
      | "type"
      | "attempts_control_level"
      | "period"
      | "attempts"
      | "number_between_attempts"
      | "stepDescription"
      | "startDate"
      | "endDate"
      | "default_"
      | "orderDefault"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "members"
      | "questionnaires"
      | "test"
    >
  : V extends "hiringStepForRequisition.view"
  ? Pick<
      HiringStep,
      "id" | "stepName" | "stepDescription" | "startDate" | "endDate"
    >
  : never;
