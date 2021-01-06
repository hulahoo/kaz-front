import { BaseUuidEntity } from "./sys$BaseUuidEntity";
export class RcgFeedbackAttachmentPojo extends BaseUuidEntity {
  static NAME = "tsadv$RcgFeedbackAttachmentPojo";
  name?: string | null;
  type?: string | null;
  url?: string | null;
}
export type RcgFeedbackAttachmentPojoViewName = "_base" | "_local" | "_minimal";
export type RcgFeedbackAttachmentPojoView<
  V extends RcgFeedbackAttachmentPojoViewName
> = never;
