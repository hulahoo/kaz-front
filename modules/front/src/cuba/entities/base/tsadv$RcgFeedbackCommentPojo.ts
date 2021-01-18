import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonPojo } from "./tsadv$PersonPojo";
export class RcgFeedbackCommentPojo extends BaseUuidEntity {
  static NAME = "tsadv$RcgFeedbackCommentPojo";
  author?: PersonPojo | null;
  createDate?: string | null;
  text?: string | null;
  reverseText?: string | null;
  translated?: number | null;
  feedbackId?: any | null;
  parentCommentId?: any | null;
  parentCommentAuthor?: PersonPojo | null;
}
export type RcgFeedbackCommentPojoViewName = "_base" | "_local" | "_minimal";
export type RcgFeedbackCommentPojoView<
  V extends RcgFeedbackCommentPojoViewName
> = never;
