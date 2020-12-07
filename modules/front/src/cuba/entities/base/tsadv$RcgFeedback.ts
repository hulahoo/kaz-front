import { AbstractParentEntity } from "./AbstractParentEntity";
import { DicRcgFeedbackType } from "./tsadv$DicRcgFeedbackType";
import { PersonGroupExt } from "./base$PersonGroupExt";
import { RcgFeedbackAttachment } from "./tsadv$RcgFeedbackAttachment";
import { RcgFeedbackComment } from "./tsadv$RcgFeedbackComment";
export class RcgFeedback extends AbstractParentEntity {
  static NAME = "tsadv$RcgFeedback";
  type?: DicRcgFeedbackType | null;
  direction?: any | null;
  author?: PersonGroupExt | null;
  receiver?: PersonGroupExt | null;
  comment?: string | null;
  commentEn?: string | null;
  commentRu?: string | null;
  feedbackDate?: any | null;
  theme?: string | null;
  themeRu?: string | null;
  themeEn?: string | null;
  attachments?: RcgFeedbackAttachment[] | null;
  comments?: RcgFeedbackComment[] | null;
}
export type RcgFeedbackViewName =
  | "_minimal"
  | "_local"
  | "_base"
  | "rcgFeedback.edit"
  | "rcgFeedback.with.comments";
export type RcgFeedbackView<V extends RcgFeedbackViewName> = V extends "_local"
  ? Pick<
      RcgFeedback,
      | "id"
      | "direction"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "feedbackDate"
      | "theme"
      | "themeRu"
      | "themeEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "_base"
  ? Pick<
      RcgFeedback,
      | "id"
      | "direction"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "feedbackDate"
      | "theme"
      | "themeRu"
      | "themeEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
    >
  : V extends "rcgFeedback.edit"
  ? Pick<
      RcgFeedback,
      | "id"
      | "direction"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "feedbackDate"
      | "theme"
      | "themeRu"
      | "themeEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "author"
      | "receiver"
      | "attachments"
    >
  : V extends "rcgFeedback.with.comments"
  ? Pick<
      RcgFeedback,
      | "id"
      | "direction"
      | "comment"
      | "commentEn"
      | "commentRu"
      | "feedbackDate"
      | "theme"
      | "themeRu"
      | "themeEn"
      | "legacyId"
      | "organizationBin"
      | "integrationUserLogin"
      | "type"
      | "author"
      | "receiver"
      | "attachments"
      | "comments"
    >
  : never;
