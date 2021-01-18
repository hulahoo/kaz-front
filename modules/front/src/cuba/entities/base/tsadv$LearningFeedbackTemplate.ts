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
  | "_base"
  | "_local"
  | "_minimal"
  | "learning-feedback-template"
  | "learningFeedbackTemplate.edit"
  | "learningFeedbackTemplate.for.course";
export type LearningFeedbackTemplateView<
  V extends LearningFeedbackTemplateViewName
> = V extends "_base"
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
  : V extends "_minimal"
  ? Pick<LearningFeedbackTemplate, "id" | "name">
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
  : never;
