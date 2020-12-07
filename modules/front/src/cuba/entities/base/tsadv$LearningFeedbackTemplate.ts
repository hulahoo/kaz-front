import { AbstractParentEntity } from "./AbstractParentEntity";
import { LearningFeedbackTemplateQuestion } from "./tsadv$LearningFeedbackTemplateQuestion";
export class LearningFeedbackTemplate extends AbstractParentEntity {
  static NAME = "tsadv$LearningFeedbackTemplate";
  name?: string | null;
  templateQuestions?: LearningFeedbackTemplateQuestion[] | null;
  active?: boolean | null;
  description?: string | null;
  usageType?: any | null;
  employee?: boolean | null;
  manager?: boolean | null;
  trainer?: boolean | null;
}
export type LearningFeedbackTemplateViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "learningFeedbackTemplate.edit"
  | "learningFeedbackTemplate.for.course"
  | "learning-feedback-template";
export type LearningFeedbackTemplateView<
  V extends LearningFeedbackTemplateViewName
> = V extends "_minimal"
  ? Pick<LearningFeedbackTemplate, "id" | "name">
  : V extends "_local"
  ? Pick<
      LearningFeedbackTemplate,
      | "id"
      | "name"
      | "active"
      | "description"
      | "usageType"
      | "employee"
      | "manager"
      | "trainer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      LearningFeedbackTemplate,
      | "id"
      | "name"
      | "active"
      | "description"
      | "usageType"
      | "employee"
      | "manager"
      | "trainer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "learningFeedbackTemplate.edit"
  ? Pick<
      LearningFeedbackTemplate,
      | "id"
      | "name"
      | "active"
      | "description"
      | "usageType"
      | "employee"
      | "manager"
      | "trainer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "templateQuestions"
    >
  : V extends "learningFeedbackTemplate.for.course"
  ? Pick<
      LearningFeedbackTemplate,
      | "id"
      | "name"
      | "active"
      | "description"
      | "usageType"
      | "employee"
      | "manager"
      | "trainer"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "templateQuestions"
    >
  : V extends "learning-feedback-template"
  ? Pick<
      LearningFeedbackTemplate,
      | "id"
      | "name"
      | "templateQuestions"
      | "active"
      | "description"
      | "usageType"
      | "employee"
      | "manager"
      | "trainer"
    >
  : never;
