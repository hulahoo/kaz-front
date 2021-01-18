import { AbstractParentEntity } from "./AbstractParentEntity";
import { Questionnaire } from "./tsadv$Questionnaire";
export class QuestionnaireResultScale extends AbstractParentEntity {
  static NAME = "tsadv$QuestionnaireResultScale";
  questionnaire?: Questionnaire | null;
  resultLang1?: string | null;
  resultLang2?: string | null;
  resultLang3?: string | null;
  resultLang4?: string | null;
  resultLang5?: string | null;
  min?: number | null;
  max?: number | null;
}
export type QuestionnaireResultScaleViewName = "_base" | "_local" | "_minimal";
export type QuestionnaireResultScaleView<
  V extends QuestionnaireResultScaleViewName
> = V extends "_base"
  ? Pick<
      QuestionnaireResultScale,
      | "id"
      | "resultLang1"
      | "resultLang2"
      | "resultLang3"
      | "resultLang4"
      | "resultLang5"
      | "min"
      | "max"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      QuestionnaireResultScale,
      | "id"
      | "resultLang1"
      | "resultLang2"
      | "resultLang3"
      | "resultLang4"
      | "resultLang5"
      | "min"
      | "max"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : never;
