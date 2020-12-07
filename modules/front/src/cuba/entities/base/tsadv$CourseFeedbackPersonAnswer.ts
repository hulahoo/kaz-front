import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackTemplate } from "./tsadv$LearningFeedbackTemplate";
import { CourseFeedbackPersonAnswerDetail } from "./tsadv$CourseFeedbackPersonAnswerDetail";
import { Course } from "./tsadv$Course";
import { CourseSectionSession } from "./tsadv$CourseSectionSession";
import { PersonGroupExt } from "./base$PersonGroupExt";
export class CourseFeedbackPersonAnswer extends AbstractParentEntity {
  static NAME = "tsadv$CourseFeedbackPersonAnswer";
  feedbackTemplate?: LearningFeedbackTemplate | null;
  details?: CourseFeedbackPersonAnswerDetail[] | null;
  course?: Course | null;
  courseSectionSession?: CourseSectionSession | null;
  completeDate?: any | null;
  responsibleRole?: any | null;
  personGroup?: PersonGroupExt | null;
  sumScore?: any | null;
  avgScore?: any | null;
}
export type CourseFeedbackPersonAnswerViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "courseFeedbackPersonAnswer.edit";
export type CourseFeedbackPersonAnswerView<
  V extends CourseFeedbackPersonAnswerViewName
> = V extends "_local"
  ? Pick<
      CourseFeedbackPersonAnswer,
      | "id"
      | "completeDate"
      | "responsibleRole"
      | "sumScore"
      | "avgScore"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CourseFeedbackPersonAnswer,
      | "id"
      | "completeDate"
      | "responsibleRole"
      | "sumScore"
      | "avgScore"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseFeedbackPersonAnswer.edit"
  ? Pick<
      CourseFeedbackPersonAnswer,
      | "id"
      | "completeDate"
      | "responsibleRole"
      | "sumScore"
      | "avgScore"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "course"
      | "courseSectionSession"
      | "personGroup"
      | "details"
      | "feedbackTemplate"
    >
  : never;
