import { AbstractParentEntity } from "./AbstractParentEntity";
import { Interview } from "./tsadv$Interview";
import { RcQuestionnaire } from "./tsadv$RcQuestionnaire";
import { InterviewQuestion } from "./tsadv$InterviewQuestion";
export class InterviewQuestionnaire extends AbstractParentEntity {
  static NAME = "tsadv$InterviewQuestionnaire";
  interview?: Interview | null;
  questionnaire?: RcQuestionnaire | null;
  questions?: InterviewQuestion[] | null;
  totalScore?: any | null;
  totalMaxScore?: any | null;
}
export type InterviewQuestionnaireViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "interviewQuestionnaire.view"
  | "interviewQuestionnaire.weight"
  | "interviewQuestionnaire.answers"
  | "interviewQuestionnaire.calculate";
export type InterviewQuestionnaireView<
  V extends InterviewQuestionnaireViewName
> = V extends "_minimal"
  ? Pick<InterviewQuestionnaire, "id">
  : V extends "_local"
  ? Pick<
      InterviewQuestionnaire,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      InterviewQuestionnaire,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "interviewQuestionnaire.view"
  ? Pick<
      InterviewQuestionnaire,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questionnaire"
      | "questions"
      | "interview"
    >
  : V extends "interviewQuestionnaire.weight"
  ? Pick<
      InterviewQuestionnaire,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "interview"
      | "questionnaire"
      | "totalScore"
      | "totalMaxScore"
      | "questions"
      | "createTs"
    >
  : V extends "interviewQuestionnaire.answers"
  ? Pick<
      InterviewQuestionnaire,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "interview"
      | "questionnaire"
      | "questions"
    >
  : V extends "interviewQuestionnaire.calculate"
  ? Pick<
      InterviewQuestionnaire,
      | "id"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "questions"
    >
  : never;
