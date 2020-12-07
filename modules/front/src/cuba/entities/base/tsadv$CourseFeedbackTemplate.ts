import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackTemplate } from "./tsadv$LearningFeedbackTemplate";
import { Course } from "./tsadv$Course";
export class CourseFeedbackTemplate extends AbstractParentEntity {
  static NAME = "tsadv$CourseFeedbackTemplate";
  feedbackTemplate?: LearningFeedbackTemplate | null;
  course?: Course | null;
  startDate?: any | null;
  endDate?: any | null;
}
export type CourseFeedbackTemplateViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "courseFeedbackTemplate.edit"
  | "courseFeedbackTemplate.course";
export type CourseFeedbackTemplateView<
  V extends CourseFeedbackTemplateViewName
> = V extends "_local"
  ? Pick<
      CourseFeedbackTemplate,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      CourseFeedbackTemplate,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "courseFeedbackTemplate.edit"
  ? Pick<
      CourseFeedbackTemplate,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "feedbackTemplate"
      | "course"
    >
  : V extends "courseFeedbackTemplate.course"
  ? Pick<
      CourseFeedbackTemplate,
      | "id"
      | "startDate"
      | "endDate"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "feedbackTemplate"
    >
  : never;
