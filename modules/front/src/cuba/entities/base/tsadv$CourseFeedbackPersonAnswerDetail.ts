import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackTemplate } from "./tsadv$LearningFeedbackTemplate";
import { Course } from "./tsadv$Course";
import { CourseSectionSession } from "./tsadv$CourseSectionSession";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { LearningFeedbackQuestion } from "./tsadv$LearningFeedbackQuestion";
import { LearningFeedbackAnswer } from "./tsadv$LearningFeedbackAnswer";
import { CourseFeedbackPersonAnswer } from "./tsadv$CourseFeedbackPersonAnswer";
export class CourseFeedbackPersonAnswerDetail extends AbstractParentEntity {
  static NAME = "tsadv$CourseFeedbackPersonAnswerDetail";
  feedbackTemplate?: LearningFeedbackTemplate | null;
  questionOrder?: number | null;
  course?: Course | null;
  courseSectionSession?: CourseSectionSession | null;
  personGroup?: PersonGroupExt | null;
  question?: LearningFeedbackQuestion | null;
  answer?: LearningFeedbackAnswer | null;
  textAnswer?: string | null;
  score?: number | null;
  courseFeedbackPersonAnswer?: CourseFeedbackPersonAnswer | null;
}
export type CourseFeedbackPersonAnswerDetailViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "courseFeedbackPersonAnswerDetail.edit";
export type CourseFeedbackPersonAnswerDetailView<
  V extends CourseFeedbackPersonAnswerDetailViewName
> = V extends "_base"
  ? Pick<
      CourseFeedbackPersonAnswerDetail,
      | "id"
      | "questionOrder"
      | "textAnswer"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      CourseFeedbackPersonAnswerDetail,
      | "id"
      | "questionOrder"
      | "textAnswer"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseFeedbackPersonAnswerDetail.edit"
  ? Pick<
      CourseFeedbackPersonAnswerDetail,
      | "id"
      | "questionOrder"
      | "textAnswer"
      | "score"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
      | "courseSectionSession"
      | "personGroup"
      | "question"
      | "answer"
      | "courseFeedbackPersonAnswer"
      | "feedbackTemplate"
    >
  : never;
