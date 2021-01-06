import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { PersonQuestionnaireAnswer } from "./tsadv$PersonQuestionnaireAnswer";
import { Questionnaire } from "./tsadv$Questionnaire";
export class PersonQuestionnaire extends AbstractParentEntity {
  static NAME = "tsadv$PersonQuestionnaire";
  appraise?: PersonGroupExt | null;
  personQuestionnaireAnswer?: PersonQuestionnaireAnswer[] | null;
  status?: any | null;
  overallScore?: number | null;
  averageScore?: any | null;
  appraiser?: PersonGroupExt | null;
  questionnaire?: Questionnaire | null;
  appraisalDate?: any | null;
}
export type PersonQuestionnaireViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "personQuestionnaire-view"
  | "personQuestionnaire.estimate";
export type PersonQuestionnaireView<
  V extends PersonQuestionnaireViewName
> = V extends "_base"
  ? Pick<
      PersonQuestionnaire,
      | "id"
      | "status"
      | "overallScore"
      | "averageScore"
      | "appraisalDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PersonQuestionnaire,
      | "id"
      | "status"
      | "overallScore"
      | "averageScore"
      | "appraisalDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "personQuestionnaire-view"
  ? Pick<
      PersonQuestionnaire,
      | "id"
      | "status"
      | "overallScore"
      | "averageScore"
      | "appraisalDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "appraise"
      | "appraiser"
      | "questionnaire"
    >
  : V extends "personQuestionnaire.estimate"
  ? Pick<
      PersonQuestionnaire,
      | "id"
      | "status"
      | "overallScore"
      | "averageScore"
      | "appraisalDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "appraise"
      | "appraiser"
      | "questionnaire"
      | "personQuestionnaireAnswer"
    >
  : never;
