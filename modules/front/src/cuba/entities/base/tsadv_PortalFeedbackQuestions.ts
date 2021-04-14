import { AbstractParentEntity } from "./AbstractParentEntity";
import { TsadvUser } from "./tsadv$UserExt";
import { PortalFeedback } from "./tsadv_PortalFeedback";
export class PortalFeedbackQuestions extends AbstractParentEntity {
  static NAME = "tsadv_PortalFeedbackQuestions";
  user?: TsadvUser | null;
  portalFeedback?: PortalFeedback | null;
  topic?: string | null;
  text?: string | null;
}
export type PortalFeedbackQuestionsViewName =
  | "_base"
  | "_local"
  | "_minimal"
  | "portalFeedbackQuestions.edit";
export type PortalFeedbackQuestionsView<
  V extends PortalFeedbackQuestionsViewName
> = V extends "_base"
  ? Pick<
      PortalFeedbackQuestions,
      | "id"
      | "topic"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_local"
  ? Pick<
      PortalFeedbackQuestions,
      | "id"
      | "topic"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "portalFeedbackQuestions.edit"
  ? Pick<
      PortalFeedbackQuestions,
      | "id"
      | "topic"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "user"
      | "portalFeedback"
      | "createTs"
    >
  : never;
