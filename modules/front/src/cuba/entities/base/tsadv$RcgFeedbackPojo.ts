import { BaseUuidEntity } from "./sys$BaseUuidEntity";
import { PersonPojo } from "./tsadv$PersonPojo";
import { DicRcgFeedbackTypePojo } from "./tsadv$DicRcgFeedbackTypePojo";
import { RcgFeedbackAttachmentPojo } from "./tsadv$RcgFeedbackAttachmentPojo";
import { RcgFeedbackCommentPojo } from "./tsadv$RcgFeedbackCommentPojo";
export class RcgFeedbackPojo extends BaseUuidEntity {
  static NAME = "tsadv$RcgFeedbackPojo";
  theme?: string | null;
  reverseTheme?: string | null;
  comment?: string | null;
  reverseComment?: string | null;
  sender?: PersonPojo | null;
  receiver?: PersonPojo | null;
  createDate?: string | null;
  type?: DicRcgFeedbackTypePojo | null;
  attachments?: RcgFeedbackAttachmentPojo | null;
  translated?: number | null;
  lastComments?: RcgFeedbackCommentPojo | null;
  commentCount?: any | null;
  commentPages?: any | null;
  say?: string | null;
  forMe?: boolean | null;
  attachmentChanged?: boolean | null;
  sendFeedbackToAuthor?: boolean | null;
}
export type RcgFeedbackPojoViewName = "_base" | "_local" | "_minimal";
export type RcgFeedbackPojoView<V extends RcgFeedbackPojoViewName> = never;
