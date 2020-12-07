import { AbstractParentEntity } from "./AbstractParentEntity";
import { FileDescriptor } from "./sys$FileDescriptor";
import { RcgFeedback } from "./tsadv$RcgFeedback";
export class RcgFeedbackAttachment extends AbstractParentEntity {
  static NAME = "tsadv$RcgFeedbackAttachment";
  file?: FileDescriptor | null;
  rcgFeedback?: RcgFeedback | null;
}
export type RcgFeedbackAttachmentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcgFeedbackAttachment.edit";
export type RcgFeedbackAttachmentView<
  V extends RcgFeedbackAttachmentViewName
> = V extends "_local"
  ? Pick<
      RcgFeedbackAttachment,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcgFeedbackAttachment,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin"
    >
  : V extends "rcgFeedbackAttachment.edit"
  ? Pick<
      RcgFeedbackAttachment,
      "id" | "legacyId" | "organizationBin" | "integrationUserLogin" | "file"
    >
  : never;
