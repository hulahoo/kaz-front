import { AbstractParentEntity } from "./AbstractParentEntity";
import { HiringStep } from "./tsadv$HiringStep";
import { RcQuestionnaire } from "./tsadv$RcQuestionnaire";
export class HiringStepQuestionnaire extends AbstractParentEntity {
  static NAME = "tsadv$HiringStepQuestionnaire";
  hiringStep?: HiringStep | null;
  questionnaire?: RcQuestionnaire | null;
}
export type HiringStepQuestionnaireViewName = "_base" | "_local" | "_minimal";
export type HiringStepQuestionnaireView<
  V extends HiringStepQuestionnaireViewName
> = V extends "_base"
  ? Pick<
      HiringStepQuestionnaire,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      HiringStepQuestionnaire,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<HiringStepQuestionnaire, "id">
  : never;
