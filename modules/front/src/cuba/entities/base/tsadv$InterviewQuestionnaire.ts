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
  | "_base"
  | "_local"
  | "_minimal"
  | "interviewQuestionnaire.answers"
  | "interviewQuestionnaire.calculate"
  | "interviewQuestionnaire.view"
  | "interviewQuestionnaire.weight";
export type InterviewQuestionnaireView<
  V extends InterviewQuestionnaireViewName
> = V extends "_base"
  ? Pick<
      InterviewQuestionnaire,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      InterviewQuestionnaire,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_minimal"
  ? Pick<InterviewQuestionnaire, "id">
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
  : never;
