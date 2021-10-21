import { AbstractParentEntity } from "./AbstractParentEntity";
import { TsadvUser } from "./tsadv$UserExt";
import { PortalFeedback } from "./tsadv_PortalFeedback";
import { DicPortalFeedbackType } from "./tsadv_DicPortalFeedbackType";
import { FileDescriptor } from "./sys$FileDescriptor";
export class PortalFeedbackQuestions extends AbstractParentEntity {
  static NAME = "tsadv_PortalFeedbackQuestions";
  user?: TsadvUser | null;
  portalFeedback?: PortalFeedback | null;
  topic?: string | null;
  text?: string | null;
  type?: DicPortalFeedbackType | null;
  files?: FileDescriptor[] | null;
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
      | "user"
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
  : V extends "_minimal"
  ? Pick<PortalFeedbackQuestions, "id" | "user">
  : V extends "portalFeedbackQuestions.edit"
  ? Pick<
      PortalFeedbackQuestions,
      | "id"
      | "version"
      | "createTs"
      | "createdBy"
      | "updateTs"
      | "updatedBy"
      | "deleteTs"
      | "deletedBy"
      | "topic"
      | "text"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "user"
      | "portalFeedback"
      | "files"
      | "type"
    >
  : never;
