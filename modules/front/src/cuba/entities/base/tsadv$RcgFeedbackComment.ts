import { AbstractParentEntity } from "./AbstractParentEntity";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { RcgFeedback } from "./tsadv$RcgFeedback";
export class RcgFeedbackComment extends AbstractParentEntity {
  static NAME = "tsadv$RcgFeedbackComment";
  text?: string | null;
  parentComment?: RcgFeedbackComment | null;
  textEn?: string | null;
  textRu?: string | null;
  author?: PersonGroupExt | null;
  rcgFeedback?: RcgFeedback | null;
}
export type RcgFeedbackCommentViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcgFeedbackComment.edit"
  | "rcgFeedbackComment.parse";
export type RcgFeedbackCommentView<
  V extends RcgFeedbackCommentViewName
> = V extends "_local"
  ? Pick<
      RcgFeedbackComment,
      | "id"
      | "text"
      | "textEn"
      | "textRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcgFeedbackComment,
      | "id"
      | "text"
      | "textEn"
      | "textRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "rcgFeedbackComment.edit"
  ? Pick<
      RcgFeedbackComment,
      | "id"
      | "text"
      | "textEn"
      | "textRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "author"
      | "createTs"
    >
  : V extends "rcgFeedbackComment.parse"
  ? Pick<
      RcgFeedbackComment,
      | "id"
      | "text"
      | "textEn"
      | "textRu"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "author"
      | "rcgFeedback"
      | "createTs"
    >
  : never;
