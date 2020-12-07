import { AbstractParentEntity } from "./AbstractParentEntity";
import { QuestionnaireResultScale } from "./tsadv$QuestionnaireResultScale";
import { DicQuestionnaireType } from "./tsadv$DicQuestionnaireType";
import { DicQuestionnaireStatus } from "./tsadv$DicQuestionnaireStatus";
import { QuestionnaireQuestion } from "./tsadv$QuestionnaireQuestion";
export class Questionnaire extends AbstractParentEntity {
  static NAME = "tsadv$Questionnaire";
  description?: string | null;
  scale?: QuestionnaireResultScale[] | null;
  descriptionLang1?: string | null;
  descriptionLang3?: string | null;
  descriptionLang4?: string | null;
  descriptionLang5?: string | null;
  descriptionLang2?: string | null;
  questionnaireType?: DicQuestionnaireType | null;
  status?: DicQuestionnaireStatus | null;
  question?: QuestionnaireQuestion[] | null;
  startDate?: any | null;
  endDate?: any | null;
  questionnaireName?: string | null;
  questionnaireNameLang1?: string | null;
  questionnaireNameLang2?: string | null;
  questionnaireNameLang3?: string | null;
  questionnaireNameLang4?: string | null;
  questionnaireNameLang5?: string | null;
}
export type QuestionnaireViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "questionnaire.browse"
  | "questionnaire.edit";
export type QuestionnaireView<
  V extends QuestionnaireViewName
> = V extends "_minimal"
  ? Pick<Questionnaire, "id" | "questionnaireNameLang1">
  : V extends "_local"
  ? Pick<
      Questionnaire,
      | "id"
      | "descriptionLang1"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "descriptionLang2"
      | "startDate"
      | "endDate"
      | "questionnaireNameLang1"
      | "questionnaireNameLang2"
      | "questionnaireNameLang3"
      | "questionnaireNameLang4"
      | "questionnaireNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      Questionnaire,
      | "id"
      | "questionnaireNameLang1"
      | "descriptionLang1"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "descriptionLang2"
      | "startDate"
      | "endDate"
      | "questionnaireNameLang2"
      | "questionnaireNameLang3"
      | "questionnaireNameLang4"
      | "questionnaireNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "questionnaire.browse"
  ? Pick<
      Questionnaire,
      | "id"
      | "status"
      | "startDate"
      | "endDate"
      | "questionnaireName"
      | "questionnaireType"
      | "descriptionLang1"
      | "descriptionLang2"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "questionnaireNameLang1"
      | "questionnaireNameLang2"
      | "questionnaireNameLang3"
      | "questionnaireNameLang4"
      | "questionnaireNameLang5"
    >
  : V extends "questionnaire.edit"
  ? Pick<
      Questionnaire,
      | "id"
      | "descriptionLang1"
      | "descriptionLang3"
      | "descriptionLang4"
      | "descriptionLang5"
      | "descriptionLang2"
      | "startDate"
      | "endDate"
      | "questionnaireNameLang1"
      | "questionnaireNameLang2"
      | "questionnaireNameLang3"
      | "questionnaireNameLang4"
      | "questionnaireNameLang5"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "question"
      | "scale"
      | "status"
    >
  : never;
